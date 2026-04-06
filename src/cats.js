/*
The amount of BULLSHIT images I had to scroll through to get these cat photos is ungodly
Like it should be considered a crime for this amount of brainrot to reside in one person
*/
const catArray = [
	"https://media.discordapp.net/attachments/1100940491765321801/1490737734065586406/IMG_8206.jpg?ex=69d52534&is=69d3d3b4&hm=bd4262e7350e4f9237f64045fa7d54e1ca8f4c9be2b44863914e81774bc3d38c&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1490574352218067026/image0.jpg?ex=69d48d0b&is=69d33b8b&hm=bb4836f3fc974de465f7b6ad7c71144f67fd9e31dc2c82beaee21be86f301218&=&format=webp&width=481&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1490131443504910506/image0.jpg?ex=69d4eacd&is=69d3994d&hm=60e88e8d7ea5cfa610cc0a9f0f68a3c155ee6abe2d47d91e2604f021174da63c&=&format=webp&width=733&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1489106940230500515/IMG_8159.jpg?ex=69d52528&is=69d3d3a8&hm=7cef5bb1e2c922b5baf06a7165fbdf8af7a782056e6fa0c0de8263a0c2d50b70&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1489084347725381652/IMG_8158.jpg?ex=69d5101e&is=69d3be9e&hm=1ca79d85bcaef7bc40a3210d2eead3ea86279f96d78eeaf254a4d97c83570b66&=&format=webp&width=1141&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1489084348132233277/IMG_8157.jpg?ex=69d5101e&is=69d3be9e&hm=c3f3ad204680ccc0b7e43e99d3f7301f99fac620c40c804122b15493a9538791&=&format=webp&width=1141&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1489079396785459261/IMG_8152.jpg?ex=69d50b81&is=69d3ba01&hm=96392366ac7c595c8effe35c8bd806ee09464b2944acaafe9f8ca5acb371b2c3&=&format=webp&width=642&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1489079397095968829/IMG_8155.jpg?ex=69d50b82&is=69d3ba02&hm=1f07406c367de15f81dd7479af2385e245104e8554dbe02a48c56bb0b6ded49d&=&format=webp&width=642&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1489079397393633391/IMG_8153.jpg?ex=69d50b82&is=69d3ba02&hm=1d3a725f933ca3dc080ffb400ef943977ce22c059d0e3b35229708daa0e821b4&=&format=webp&width=642&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1489068523069112341/IMG_6945.jpg?ex=69d50161&is=69d3afe1&hm=8c8ca2a05c5dcce96d70719b20d6a9ad584708d6c3b846fd6f5f1abd7b058833&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1488748656462008441/IMG_8134.jpg?ex=69d528fb&is=69d3d77b&hm=5fc32439ce697f12194dd8e0487a3df02f49c195c99521dc65eae5b9bb3bbcc1&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1488368239980445797/IMG_8114.jpg?ex=69d51830&is=69d3c6b0&hm=71f04d5cff29eaec35c2abed38b7f1b2afa8328e7b42fc172173fbe84fdc6a93&=&format=webp&width=642&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1488368240282570752/IMG_8113.jpg?ex=69d51831&is=69d3c6b1&hm=90b23dcf14fbb30ef41f6870dd628c93d9d22ae50a730a29a2ce8c00c304e208&=&format=webp&width=642&height=856",
	"https://media.discordapp.net/attachments/1100940491765321801/1488363076632711168/IMG_8109.jpg?ex=69d51361&is=69d3c1e1&hm=bb47930226e438b34f09e739aaecbe2f0475e1302c6101a54542d22af8ee5881&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1487280444318941255/IMG_8076.jpg?ex=69d5179a&is=69d3c61a&hm=c03b040fe8c22896aebdc047cf5fb22beb4aee78a38c164740cf3757a59a072a&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1487137093061972209/IMG_8065.jpg?ex=69d49218&is=69d34098&hm=3a6da7d6171f3a5225040a82896b6c7e997767a69b5571904f09d671af8370d2&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1486847936339120178/IMG_8060.jpg?ex=69d4d64c&is=69d384cc&hm=22eae0d79f20dd7892d5ba63d3c0cc5fd2b19257d1f05b8cb8155996789ac1cc&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1486578257938874530/image0.jpg?ex=69d52ca3&is=69d3db23&hm=1fe1e20eaace3022349f8ddc67b704bb4e819216505c79194f8fb3cfa1bf2767&=&format=webp&width=843&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1485451908867952791/IMG_7992.jpg?ex=69d50825&is=69d3b6a5&hm=ac32677d5d321ac96153a4c7868e802352e953bd20fb2d2a569c1380a77d968e&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1485420867964895232/IMG_7989.jpg?ex=69d4eb3c&is=69d399bc&hm=cf30d2182c723babc46994945d842831be050f08e4ab28f0dece6f7e00aebaf0&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1483625900670058597/IMG_7938.jpg?ex=69d4fb0b&is=69d3a98b&hm=a60480428651e20789938392da453d09c2693cbfa1a5e8c9a734302ad92b8903&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1483624738822684722/IMG_7937.jpg?ex=69d4f9f6&is=69d3a876&hm=0bf9ffeb6e964216efa6c2a32fa87c28b9c09824865f7e7f1cd8cd8bd1577c98&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1483555642567426088/IMG_7931.jpg?ex=69d4b99c&is=69d3681c&hm=f6979238245623740af46277f24f3e0e96fe377006095a111f68b77450cd3dd6&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1482094367476027392/IMG_7888.jpg?ex=69d4aeb1&is=69d35d31&hm=17c5a02029d50561b724ed1dabedfc32967258edc788ca2a177345a0ddbc9a38&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1482094254917554257/IMG_7887.jpg?ex=69d4ae96&is=69d35d16&hm=0a4814b3d11e83f01fbd788904afe4f7e22d754883d35d1ec5b41980475109c6&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1481847954531811432/IMG_7883.jpg?ex=69d51ab3&is=69d3c933&hm=62278a5ad7972a8afe3b7f6e85be6326ea92e49cf44d8e08b9cd6273d02a5ea0&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1481835409578135722/IMG_7881.jpg?ex=69d50f04&is=69d3bd84&hm=f2b33e0dcfd8dfd9ae929ccbfc0f77be75400af0c2a174440abcab492710799a&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1480754461394862151/IMG_7848.jpg?ex=69d514ce&is=69d3c34e&hm=cb8229bd612dae59029184977ca588b81276c26ea245f00cef4f0795a3aea666&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1480047580594438144/IMG_7827.jpg?ex=69d52579&is=69d3d3f9&hm=10cb3143368a4edf42409f71b5bd0ff8b6be10a8cf7bb30007fa7270c15c3fca&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1480047475552292864/IMG_7826.jpg?ex=69d52560&is=69d3d3e0&hm=fe463490af0696a12249d64226c879983c374d20acbe014def00ee8604eb293c&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1480016526466875546/IMG_7824.jpg?ex=69d5088d&is=69d3b70d&hm=5450a046abb81ec66eaf6aff4e3f059302470a2b94f6522e64a4b091b745b5cc&=&format=webp&width=562&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1479954295196618873/IMG_7817.jpg?ex=69d4ce98&is=69d37d18&hm=4b1560e38c6e5e1a1ec7c8db7cbcbd4f071edbe05da408ccb33e45bba9bd8503&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1479554159370834005/IMG_7809.jpg?ex=69d4ab70&is=69d359f0&hm=d1cf84ad649868a8cde8f027c4534dbffc1584c195035657beb6698815517284&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1479222201088479292/IMG_7798.jpg?ex=69d4c7c7&is=69d37647&hm=80179b7c38ca0f8fc3232d4f4300b27ad537c150bb9a786e8824c29cbf865b9d&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1479221659830587524/IMG_7797.jpg?ex=69d4c746&is=69d375c6&hm=33f0bd255306b0db459abd710cd82cb813d7a9405496205f715d4fc8788e3fc8&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1479144963068526684/IMG_7796.jpg?ex=69d52898&is=69d3d718&hm=01059f94f529e2a1e09fc22e7fc0069b200b778f6b8a039e4e8306ee202ef29c&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1478886912579211396/IMG_7787.jpg?ex=69d4e104&is=69d38f84&hm=dc80ee9922f31d45013f959e6719e527c860ede89e83a79757c41cd7e11f3f25&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1478886785449722090/IMG_7786.jpg?ex=69d4e0e6&is=69d38f66&hm=37ec184a565086e1c87b91f1d34f4c266592936c2a2c88142ba64993ddb80928&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1478590086198202378/IMG_7779.jpg?ex=69d51e13&is=69d3cc93&hm=ddc1fa5babf8e3cda04c197144b8509014c0002d723b78b1cc393409028a1270&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1477842990952218624/IMG_7755.jpg?ex=69d5094a&is=69d3b7ca&hm=b532f3c6c1b68dc498dbeba682f503db46fdaca0e42f1bbf224f3f5e9fbe2771&=&format=webp&width=1280&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1477833581169737890/IMG_7750.jpg?ex=69d50086&is=69d3af06&hm=522194909b5190ab69ff4eb854b10847c50239ada0e64042df37d89ffe4518fb&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1477833371433570516/IMG_7748.jpg?ex=69d50054&is=69d3aed4&hm=8f79cf034c0109648faa89294ef23b00911b91ff4c20c98987112f7bc2344254&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1487899760756134021/1490748304831811705/Nan_Emjoy.png?ex=69d52f0c&is=69d3dd8c&hm=63e7be118ab4dfc57d1098be4876b425ab09555bd9244f2e8bcfd2ddce4f33b6&=&format=webp&quality=lossless", // This is the one
	"https://media.discordapp.net/attachments/1100940491765321801/1473742847126798570/IMG_3622.jpg?ex=69d49f3b&is=69d34dbb&hm=64899c0308b92d5b583a18a1da636b88ebc9e93bcfa6808f036c7de9720d3b19&=&format=webp&width=651&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1473742377129738390/FullSizeRender.jpg?ex=69d49ecb&is=69d34d4b&hm=4139ee7deafefd67ab9f741f6ea01382bdf7a2b324f423651093af3a131680be&=&format=webp&width=868&height=959",
	"https://media.discordapp.net/attachments/1100940491765321801/1472051900903063592/IMG_7607.jpg?ex=69d50fea&is=69d3be6a&hm=dfcd14ee2a053bef8ec0a6c180a9ef7d03bca96081af359e20a1eef4736dd2f0&=&format=webp&width=720&height=960",
	"https://media.discordapp.net/attachments/1100940491765321801/1470642024616038615/IMG_0625.jpg?ex=69d48c1d&is=69d33a9d&hm=e23f35033cae3d26c235a0b0582d0c45152ee12656053a69c0ed8c3e964fd214&=&format=webp&width=467&height=350"
];

// Gets a random image from the array and returns it
export function quinnCats() {
	let catIndex = Math.floor(Math.random() * catArray.length);

	return { catImage: catArray[catIndex], index: catIndex };
}
