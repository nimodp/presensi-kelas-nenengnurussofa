if(localStorage.getItem("login")!="true"){

window.location="login.html";

}
const siswa = [

{nis:"1001", nama:"Andi"},
{nis:"1002", nama:"Budi"},
{nis:"1003", nama:"Citra"},
{nis:"1004", nama:"Doni"},
{nis:"1005", nama:"Eka"},
{nis:"1006", nama:"Farhan"},
{nis:"1007", nama:"Gina"},
{nis:"1008", nama:"Hadi"},
{nis:"1009", nama:"Indah"},
{nis:"1010", nama:"Joko"}

];

let presensi = JSON.parse(localStorage.getItem("presensi")) || [];

const tbody=document.querySelector("tbody");

function tampilkan(){

tbody.innerHTML="";

siswa.forEach((s,index)=>{

let data=presensi.find(x=>x.nis==s.nis);

let status="Belum";
let jam="-";

if(data){

status="Hadir";
jam=data.jam;

}

tbody.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${s.nis}</td>

<td>${s.nama}</td>

<td>${status}</td>

<td>${jam}</td>

</tr>

`;

});

}

tampilkan();

function getTanggalHari(){

    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const sekarang = new Date();

    return {
        hari: hari[sekarang.getDay()],
        tanggal: sekarang.toLocaleDateString("id-ID")
    };

function suksesScan(decodedText){

let siswaCari=siswa.find(x=>x.nis==decodedText);

if(!siswaCari){

alert("Barcode tidak dikenal");

return;

}

let sudah=presensi.find(x=>x.nis==decodedText);

if(sudah){

alert("Sudah Presensi");

return;

}

let waktu=new Date().toLocaleTimeString();

presensi.push({

nis:siswaCari.nis,

nama:siswaCari.nama,

jam:waktu

});

localStorage.setItem("presensi", JSON.stringify(presensi));

tampilkan();

}

const scanner=new Html5QrcodeScanner(

"reader",

{fps:10,qrbox:250}

);

scanner.render(suksesScan);

function downloadExcel(){

let data=[];

siswa.forEach((s,index)=>{

let hadir=presensi.find(x=>x.nis==s.nis);

data.push({

No:index+1,

NIS:s.nis,

Nama:s.nama,

Status:hadir?"Hadir":"Belum",

Jam:hadir?hadir.jam:"-"

});

});

let wb=XLSX.utils.book_new();

let ws=XLSX.utils.json_to_sheet(data);

XLSX.utils.book_append_sheet(wb,ws,"Presensi");

XLSX.writeFile(wb,"Presensi.xlsx");

}

function logout(){

localStorage.removeItem("login");

window.location="login.html";

}

function resetPresensi(){

    if(confirm("Yakin ingin menghapus semua data presensi?")){

        presensi = [];

        localStorage.removeItem("presensi");

        tampilkan();

    }

}
