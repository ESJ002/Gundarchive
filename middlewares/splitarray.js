

let allKits = [
    { "ID": 1, "name": "RX-78-2 Gundam", "grade": "HG" },
    { "ID": 2, "name": "MS-06 Zaku II", "grade": "MG" },
    { "ID": 3, "name": "MSN-04 Sazabi", "grade": "RG" },
    { "ID": 4, "name": "XXXG-00W0 Wing Gundam Zero", "grade": "PG" },
    { "ID": 5, "name": "RX-93 Nu Gundam", "grade": "SD" },
    { "ID": 6, "name": "GN-001 Exia", "grade": "HG" },
    { "ID": 7, "name": "ZGMF-X10A Freedom Gundam", "grade": "MG" },
    { "ID": 8, "name": "ASW-G-08 Gundam Barbatos", "grade": "RG" },
    { "ID": 9, "name": "RX-0 Unicorn Gundam", "grade": "PG" },
    { "ID": 10, "name": "MSZ-006 Zeta Gundam", "grade": "SD" },
    { "ID": 11, "name": "XXXG-01H Gundam Heavyarms", "grade": "HG" },
    { "ID": 12, "name": "GN-0000 00 Gundam", "grade": "MG" },
    { "ID": 13, "name": "GAT-X105 Strike Gundam", "grade": "RG" },
    { "ID": 14, "name": "MBF-P02 Gundam Astray Red Frame", "grade": "PG" },
    { "ID": 15, "name": "MS-07B Gouf", "grade": "SD" },
    { "ID": 16, "name": "MS-09 Dom", "grade": "HG" },
    { "ID": 17, "name": "LM312V04 Victory Gundam", "grade": "MG" },
    { "ID": 18, "name": "RX-178 Gundam Mk-II", "grade": "RG" },
    { "ID": 19, "name": "ORB-01 Akatsuki Gundam", "grade": "PG" },
    { "ID": 20, "name": "MSN-00100 Hyaku Shiki", "grade": "SD" },
    { "ID": 21, "name": "GNT-0000 00 Qan[T]", "grade": "HG" },
    { "ID": 22, "name": "MS-06F Zaku II", "grade": "MG" },
    { "ID": 23, "name": "RX-79(G) Gundam Ground Type", "grade": "RG" },
    { "ID": 24, "name": "RGM-79 GM", "grade": "PG" },
    { "ID": 25, "name": "MS-18E Kämpfer", "grade": "SD" },
    { "ID": 26, "name": "GN-002 Gundam Dynames", "grade": "HG" },
    { "ID": 27, "name": "XXXG-01D Gundam Deathscythe", "grade": "MG" },
    { "ID": 28, "name": "OZ-00MS Tallgeese", "grade": "RG" },
    { "ID": 29, "name": "YMS-15 Gyan", "grade": "PG" },
    { "ID": 30, "name": "RMS-108 Marasai", "grade": "SD" }
  ]

pageLength = 12
let pageNumber = 3

let startIndex = (pageNumber - 1) * 12 
const kits = allKits.slice(startIndex, startIndex + 12)

console.log(kits);
