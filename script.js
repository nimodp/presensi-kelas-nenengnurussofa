if(localStorage.getItem("login")!="true"){

window.location="login.html";

}
const siswa = [

{nis:"Displaybarcode” 1001”qr", nama:"Arjuna Aditya"},
{nis:"Displaybarcode” 1002”qr", nama:"Bilal Busyairi"},
{nis:"Displaybarcode” 1003”qr", nama:"Cantika Akleema"},
{nis:"Displaybarcode” 1004”qr", nama:"Devano Syafiq Ahmad"},
{nis:"Displaybarcode” 1005”qr", nama:"Fairuz Attar"},
{nis:"Displaybarcode” 1006”qr", nama:"Farel Kurniawan"},
{nis:"Displaybarcode” 1007”qr", nama:"Muhammad Aidan"},
{nis:"Displaybarcode” 1008”qr", nama:"Muhammad Uwais Al-Qorni"},
{nis:"Displaybarcode” 1009”qr", nama:"Naomi Putri Tama"},
{nis:"Displaybarcode” 1010”qr", nama:"Okha Suharesz"},
{nis:"Displaybarcode” 1011”qr", nama:"Raja Syamil Elwafie"},
{nis:"Displaybarcode” 1012”qr", nama:"Sultan Muhammad Alfatih"}

];

let presensi = JSON.parse(localStorage.getItem("presensi")) || [];

const tbody=document.querySelector("tbody");

function tampilkan(){

tbody.innerHTML="";

siswa.forEach((s,index)=>{

let data=presensi.find(x=>x.nis==s.nis);

let status="Tidak Hadir";
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

<td>${data ? data.hari : "-"}</td>

<td>${data ? data.tanggal : "-"}</td>

<td>${status}</td>

<td>${jam}</td>

<td>

<select onchange="ubahKeterangan('${s.nis}', this.value)">

<option value="" ${!data?.keterangan ? "selected" : ""}>--Pilih--</option>

<option value="Sakit" ${data?.keterangan=="Sakit"?"selected":""}>Sakit</option>

<option value="Izin" ${data?.keterangan=="Izin"?"selected":""}>Izin</option>

</select>

</td>

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
}

tampilkan();

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

const info = getTanggalHari();

presensi.push({

    nis:siswaCari.nis,

    nama:siswaCari.nama,

    hari: info.hari,

    tanggal: info.tanggal,

    jam:waktu,

    keterangan:""

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

    Hari: hadir ? hadir.hari : "-",

    Tanggal: hadir ? hadir.tanggal : "-",

    Status: hadir ? "Hadir" : "Tidak Hadir",

    Jam: hadir ? hadir.jam : "-",

    Keterangan: hadir ? (hadir.keterangan || "") : ""

});

})

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

function ubahKeterangan(nis, nilai){

    let data = presensi.find(x => x.nis == nis);

    if(data){

        data.keterangan = nilai;

        localStorage.setItem("presensi", JSON.stringify(presensi));

        tampilkan();

    }

}
