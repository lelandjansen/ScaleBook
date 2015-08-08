/*
  ScaleBook
  ScaleBook.js
  v1.0.0
  Copyright (c) Leland Jansen 2015. All rights reserved.
*/






/////////// Transform user input ///////////

// Initialize i, j, and k
var i, j, k;

// Replace certain special characters
function replaceSpecialCharacters(string) {
	"use strict";

	// List of special characters (first array element) with replacement (second array element)
	var specialCharacters = [
		["#",	"-sharp"],
		["♯",	"-sharp"],
		["♭",	"-flat"],
		["♮",	"-natural"],
		["ó",	"o"],
		["'s",	""],
		[",",	"-or-"],
		["'",	""],
		[" ",	"-"]
	];

	// Loop through each element of specialCharacters
	for (i = 0; i < specialCharacters.length; i++) {
		// If an iteration of that special character is encountered in the string
		while (string.indexOf(specialCharacters[i][0]) > -1) {
			// Replace it
			string = string.replace(specialCharacters[i][0], specialCharacters[i][1]);
		}
	}

	// Take out characters that are not alphanumeric, " ", or "-"
	string = string.replace(/[^\w\s\-]/gi, "");

	return string;

} // End of replaceSpecialCharacters


// Convert certain one- and two-letter words to accidentals
function letterToAccidental(stringArray) {
	"use strict";

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// If the element is two letters long
		if (stringArray[i].length === 2) {
			// If the first letter is c, d, e, a g, or a number between 0 and 7 (inclusive)
			if (/[cdeag01234567]/.test(stringArray[i].charAt(0))) {
				// If the second letter is s, f, b, n
				if (/[sfbn]/.test(stringArray[i].charAt(1))) {
					// Replace second letter with the corresponding accidental
					stringArray[i] = stringArray[i]
					.replace("s", "-sharp")
					.replace("f", "-flat")
					.replace("b", "-flat")
					.replace("n", "-natural");
				}
			}
			// If the first letter is f or b
			else if (/[fb]/.test(stringArray[i].charAt(0))) {
				// If the second letter is s, f, b, or n
				if (/[sfbn]/.test(stringArray[i].charAt(1))) {
					// Replace second letter with the corresponding accidental
					stringArray[i] = stringArray[i]
					.replace("s", "-sharp")
					.replace("n", "-natural")
					.replace("ff", "f-flat")
					.replace("fb", "f-flat")
					.replace("bf", "b-flat")
					.replace("bb", "b-flat");
				}
			}
			// If the word is "ks"
			else if (/ks/.test(stringArray[i])) {
				// Replace whole word "with key-signature"
				stringArray[i] = "key-signature";
			}
		}
		// If element is 5 characters long and contains "flat" and is not "flats"
		else if (stringArray[i].length === 5 && /flat/.test(stringArray[i] && stringArray[i] !== "flats")) {
			// If first character is c, d, e, f, g, a, or b
			if (/[cdefgab]/.test(stringArray[i].charAt(0))) {
				// Replace "flat" with "-flat"
				stringArray[i] = stringArray[i].replace("flat", "-flat");
			}
		}
		// If element is 6 characters long and contains "sharp"
		else if (stringArray[i].length === 6 && /sharp/.test(stringArray[i])) {
			// If first character is c, d, e, f, g, a, or b
			if (/[cdefgab]/.test(stringArray[i].charAt(0))) {
				// Replace "sharp" with "-sharp"
				stringArray[i] = stringArray[i].replace("sharp", "-sharp");
			}
		}
		// If the element is just the letter s
		else if (stringArray[i].length === 1 && stringArray[i] === "s") {
			// Replace "s" with "sharp"
			stringArray[i] = "sharp";
		}
	}

	return stringArray;

} // letterToAccidental



// Find and replace typos
function fixTypo(stringArray) {
	"use strict";

	// List of typos
	var typo = [
		// Sharp
		["sharp","sharps","harp","sarp","shrp","shap","shar","ssharp","shharp","shaarp","sharrp","sharpp","hsarp","sahrp","shrap","shapr","aharp","wharp","eharp","dharp","xharp","zharp","sgarp","syarp","suarp","sjarp","snarp","sbarp","shqrp","shwrp","shsrp","shxrp","shzrp","shaep","sha4p","sha5p","shatp","shagp","shafp","shadp","sharo","shar0","sharl","asharp","saharp","wsharp","swharp","esharp","seharp","dsharp","sdharp","xsharp","sxharp","zsharp","szharp","sgharp","shgarp","syharp","shyarp","suharp","shuarp","sjharp","shjarp","snharp","shnarp","sbharp","shbarp","shqarp","shaqrp","shwarp","shawrp","shsarp","shasrp","shxarp","shaxrp","shzarp","shazrp","shaerp","sharep","sha4rp","shar4p","sha5rp","shar5p","shatrp","shartp","shagrp","shargp","shafrp","sharfp","shadrp","shardp","sharop","sharpo","shar0p","sharp0","sharlp","sharpl","sharb","sharos"],
		// Flat
		["flat","flats","lat","fat","flt","fla","fflat","fllat","flaat","flatt","lfat","falt","flta","dlat","rlat","tlat","glat","vlat","clat","fkat","foat","fpat","flqt","flwt","flst","flxt","flzt","flar","fla5","fla6","flay","flah","flag","flaf","dflat","fdlat","rflat","frlat","tflat","ftlat","gflat","fglat","vflat","fvlat","cflat","fclat","fklat","flkat","folat","float","fplat","flpat","flqat","flaqt","flwat","flawt","flsat","flast","flxat","flaxt","flzat","flazt","flart","flatr","fla5t","flat5","fla6t","flat6","flayt","flaty","flaht","flath","flagt","flatg","flaft","flatf","flab"],

		// Scale
		["scale","scales","cale","sale","scle","scae","scal","sscale","sccale","scaale","scalle","scalee","csale","sacle","sclae","scael","acale","wcale","ecale","dcale","xcale","zcale","sxale","sdale","sfale","svale","scqle","scwle","scsle","scxle","sczle","scake","scaoe","scape","scalw","scal3","scal4","scalr","scalf","scald","scals","ascale","sacale","wscale","swcale","escale","secale","dscale","sdcale","xscale","sxcale","zscale","szcale","sxcale","scxale","sdcale","scdale","sfcale","scfale","svcale","scvale","scqale","scaqle","scwale","scawle","scsale","scasle","scxale","scaxle","sczale","scazle","scakle","scalke","scaole","scaloe","scaple","scalpe","scalwe","scalew","scal3e","scale3","scal4e","scale4","scalre","scaler","scalfe","scalef","scalde","scaled","scalse","scales"],
		// Major
		["major","maj","majer","majors","ajor","mjor","maor","majr","majo","mmajor","maajor","majjor","majoor","majorr","amjor","mjaor","maojr","majro","najor","jajor","kajor","mqjor","mwjor","msjor","mxjor","mzjor","mahor","mauor","maior","makor","mamor","manor","majir","maj9r","maj0r","majpr","majlr","majkr","majoe","majo4","majo5","majot","majog","majof","majod","nmajor","mnajor","jmajor","mjajor","kmajor","mkajor","mqajor","maqjor","mwajor","mawjor","msajor","masjor","mxajor","maxjor","mzajor","mazjor","mahjor","majhor","maujor","majuor","maijor","majior","makjor","majkor","mamjor","majmor","manjor","majnor","majior","majoir","maj9or","majo9r","maj0or","majo0r","majpor","majopr","majlor","majolr","majkor","majokr","majoer","majore","majo4r","major4","majo5r","major5","majotr","majort","majogr","majorg","majofr","majorf","majodr","majord"],
		// Minor
		["minor","min","miner","minors","inor","mnor","mior","minr","mino","mminor","miinor","minnor","minoor","minorr","imnor","mnior","mionr","minro","ninor","jinor","kinor","munor","m8nor","m9nor","monor","mlnor","mknor","mjnor","mibor","mihor","mijor","mimor","minir","min9r","min0r","minpr","minlr","minkr","minoe","mino4","mino5","minot","minog","minof","minod","nminor","mninor","jminor","mjinor","kminor","mkinor","muinor","miunor","m8inor","mi8nor","m9inor","mi9nor","moinor","mionor","mlinor","milnor","mkinor","miknor","mjinor","mijnor","mibnor","minbor","mihnor","minhor","mijnor","minjor","mimnor","minmor","minior","minoir","min9or","mino9r","min0or","mino0r","minpor","minopr","minlor","minolr","minkor","minokr","minoer","minore","mino4r","minor4","mino5r","minor5","minotr","minort","minogr","minorg","minofr","minorf","minodr","minord"],
		// Mode
		["mode","modes","ode","mde","moe","mod","mmode","moode","modde","modee","omde","mdoe","moed","node","jode","kode","mide","m9de","m0de","mpde","mlde","mkde","mose","moee","more","mofe","moce","moxe","modw","mod3","mod4","modr","modf","modd","mods","nmode","mnode","jmode","mjode","kmode","mkode","miode","moide","m9ode","mo9de","m0ode","mo0de","mpode","mopde","mlode","molde","mkode","mokde","mosde","modse","moede","modee","morde","modre","mofde","modfe","mocde","modce","moxde","modxe","modwe","modew","mod3e","mode3","mod4e","mode4","modre","moder","modfe","modef","modde","moded","modse","modes"],
		// Ionian
		["ionian","ion","onian","inian","ioian","ionan","ionin","ionia","iionian","ioonian","ionnian","ioniian","ioniaan","ioniann","oinian","inoian","ioinan","ionain","ionina","uonian","8onian","9onian","oonian","lonian","konian","jonian","iinian","i9nian","i0nian","ipnian","ilnian","iknian","iobian","iohian","iojian","iomian","ionuan","ion8an","ion9an","ionoan","ionlan","ionkan","ionjan","ioniqn","ioniwn","ionisn","ionixn","ionizn","ioniab","ioniah","ioniaj","ioniam","uionian","iuonian","8ionian","i8onian","9ionian","i9onian","oionian","ioonian","lionian","ilonian","kionian","ikonian","jionian","ijonian","iionian","ioinian","i9onian","io9nian","i0onian","io0nian","iponian","iopnian","ilonian","iolnian","ikonian","ioknian","iobnian","ionbian","iohnian","ionhian","iojnian","ionjian","iomnian","ionmian","ionuian","ioniuan","ion8ian","ioni8an","ion9ian","ioni9an","ionoian","ionioan","ionlian","ionilan","ionkian","ionikan","ionjian","ionijan","ioniqan","ioniaqn","ioniwan","ioniawn","ionisan","ioniasn","ionixan","ioniaxn","ionizan","ioniazn","ioniabn","ionianb","ioniahn","ionianh","ioniajn","ionianj","ioniamn","ionianm"],
		// Dorian
		["dorian","dor","orian","drian","doian","doran","dorin","doria","ddorian","doorian","dorrian","doriian","doriaan","doriann","odrian","droian","doiran","dorain","dorina","sorian","eorian","rorian","forian","corian","xorian","dirian","d9rian","d0rian","dprian","dlrian","dkrian","doeian","do4ian","do5ian","dotian","dogian","dofian","dodian","doruan","dor8an","dor9an","doroan","dorlan","dorkan","dorjan","doriqn","doriwn","dorisn","dorixn","dorizn","doriab","doriah","doriaj","doriam","sdorian","dsorian","edorian","deorian","rdorian","drorian","fdorian","dforian","cdorian","dcorian","xdorian","dxorian","diorian","doirian","d9orian","do9rian","d0orian","do0rian","dporian","doprian","dlorian","dolrian","dkorian","dokrian","doerian","doreian","do4rian","dor4ian","do5rian","dor5ian","dotrian","dortian","dogrian","dorgian","dofrian","dorfian","dodrian","dordian","doruian","doriuan","dor8ian","dori8an","dor9ian","dori9an","doroian","dorioan","dorlian","dorilan","dorkian","dorikan","dorjian","dorijan","doriqan","doriaqn","doriwan","doriawn","dorisan","doriasn","dorixan","doriaxn","dorizan","doriazn","doriabn","dorianb","doriahn","dorianh","doriajn","dorianj","doriamn","dorianm"],
		// Phrygian
		["phrygian",	"phryg","hrygian","prygian","phygian","phrgian","phryian","phrygan","phrygin","phrygia","pphrygian","phhrygian","phrrygian","phryygian","phryggian","phrygiian","phrygiaan","phrygiann","hprygian","prhygian","phyrgian","phrgyian","phryigan","phrygain","phrygina","ohrygian","0hrygian","lhrygian","pgrygian","pyrygian","purygian","pjrygian","pnrygian","pbrygian","pheygian","ph4ygian","ph5ygian","phtygian","phgygian","phfygian","phdygian","phrtgian","phr6gian","phr7gian","phrugian","phrjgian","phrhgian","phrggian","phryfian","phrytian","phryyian","phryhian","phrybian","phryvian","phryguan","phryg8an","phryg9an","phrygoan","phryglan","phrygkan","phrygjan","phrygiqn","phrygiwn","phrygisn","phrygixn","phrygizn","phrygiab","phrygiah","phrygiaj","phrygiam","ophrygian","pohrygian","0phrygian","p0hrygian","lphrygian","plhrygian","pghrygian","phgrygian","pyhrygian","phyrygian","puhrygian","phurygian","pjhrygian","phjrygian","pnhrygian","phnrygian","pbhrygian","phbrygian","pherygian","phreygian","ph4rygian","phr4ygian","ph5rygian","phr5ygian","phtrygian","phrtygian","phgrygian","phrgygian","phfrygian","phrfygian","phdrygian","phrdygian","phrtygian","phrytgian","phr6ygian","phry6gian","phr7ygian","phry7gian","phruygian","phryugian","phrjygian","phryjgian","phrhygian","phryhgian","phrgygian","phryggian","phryfgian","phrygfian","phrytgian","phrygtian","phryygian","phrygyian","phryhgian","phryghian","phrybgian","phrygbian","phryvgian","phrygvian","phryguian","phrygiuan","phryg8ian","phrygi8an","phryg9ian","phrygi9an","phrygoian","phrygioan","phryglian","phrygilan","phrygkian","phrygikan","phrygjian","phrygijan","phrygiqan","phrygiaqn","phrygiwan","phrygiawn","phrygisan","phrygiasn","phrygixan","phrygiaxn","phrygizan","phrygiazn","phrygiabn","phrygianb","phrygiahn","phrygianh","phrygiajn","phrygianj","phrygiamn","phrygianm"],
		// Lydian
		["lydian","lyd","ydian","ldian","lyian","lydan","lydin","lydia","llydian","lyydian","lyddian","lydiian","lydiaan","lydiann","yldian","ldyian","lyidan","lydain","lydina","kydian","oydian","pydian","ltdian","l6dian","l7dian","ludian","ljdian","lhdian","lgdian","lysian","lyeian","lyrian","lyfian","lycian","lyxian","lyduan","lyd8an","lyd9an","lydoan","lydlan","lydkan","lydjan","lydiqn","lydiwn","lydisn","lydixn","lydizn","lydiab","lydiah","lydiaj","lydiam","klydian","lkydian","olydian","loydian","plydian","lpydian","ltydian","lytdian","l6ydian","ly6dian","l7ydian","ly7dian","luydian","lyudian","ljydian","lyjdian","lhydian","lyhdian","lgydian","lygdian","lysdian","lydsian","lyedian","lydeian","lyrdian","lydrian","lyfdian","lydfian","lycdian","lydcian","lyxdian","lydxian","lyduian","lydiuan","lyd8ian","lydi8an","lyd9ian","lydi9an","lydoian","lydioan","lydlian","lydilan","lydkian","lydikan","lydjian","lydijan","lydiqan","lydiaqn","lydiwan","lydiawn","lydisan","lydiasn","lydixan","lydiaxn","lydizan","lydiazn","lydiabn","lydianb","lydiahn","lydianh","lydiajn","lydianj","lydiamn","lydianm"],
		// Mixolydian
		["mixolydian","mixo","mixolyd","ixolydian","mxolydian","miolydian","mixlydian","mixoydian","mixoldian","mixolyian","mixolydan","mixolydin","mixolydia","mmixolydian","miixolydian","mixxolydian","mixoolydian","mixollydian","mixolyydian","mixolyddian","mixolydiian","mixolydiaan","mixolydiann","imxolydian","mxiolydian","mioxlydian","mixloydian","mixoyldian","mixoldyian","mixolyidan","mixolydain","mixolydina","nixolydian","jixolydian","kixolydian","muxolydian","m8xolydian","m9xolydian","moxolydian","mlxolydian","mkxolydian","mjxolydian","mizolydian","misolydian","midolydian","micolydian","mixilydian","mix9lydian","mix0lydian","mixplydian","mixllydian","mixklydian","mixokydian","mixooydian","mixopydian","mixoltdian","mixol6dian","mixol7dian","mixoludian","mixoljdian","mixolhdian","mixolgdian","mixolysian","mixolyeian","mixolyrian","mixolyfian","mixolycian","mixolyxian","mixolyduan","mixolyd8an","mixolyd9an","mixolydoan","mixolydlan","mixolydkan","mixolydjan","mixolydiqn","mixolydiwn","mixolydisn","mixolydixn","mixolydizn","mixolydiab","mixolydiah","mixolydiaj","mixolydiam","nmixolydian","mnixolydian","jmixolydian","mjixolydian","kmixolydian","mkixolydian","muixolydian","miuxolydian","m8ixolydian","mi8xolydian","m9ixolydian","mi9xolydian","moixolydian","mioxolydian","mlixolydian","milxolydian","mkixolydian","mikxolydian","mjixolydian","mijxolydian","mizxolydian","mixzolydian","misxolydian","mixsolydian","midxolydian","mixdolydian","micxolydian","mixcolydian","mixiolydian","mixoilydian","mix9olydian","mixo9lydian","mix0olydian","mixo0lydian","mixpolydian","mixoplydian","mixlolydian","mixollydian","mixkolydian","mixoklydian","mixoklydian","mixolkydian","mixoolydian","mixoloydian","mixoplydian","mixolpydian","mixoltydian","mixolytdian","mixol6ydian","mixoly6dian","mixol7ydian","mixoly7dian","mixoluydian","mixolyudian","mixoljydian","mixolyjdian","mixolhydian","mixolyhdian","mixolgydian","mixolygdian","mixolysdian","mixolydsian","mixolyedian","mixolydeian","mixolyrdian","mixolydrian","mixolyfdian","mixolydfian","mixolycdian","mixolydcian","mixolyxdian","mixolydxian","mixolyduian","mixolydiuan","mixolyd8ian","mixolydi8an","mixolyd9ian","mixolydi9an","mixolydoian","mixolydioan","mixolydlian","mixolydilan","mixolydkian","mixolydikan","mixolydjian","mixolydijan","mixolydiqan","mixolydiaqn","mixolydiwan","mixolydiawn","mixolydisan","mixolydiasn","mixolydixan","mixolydiaxn","mixolydizan","mixolydiazn","mixolydiabn","mixolydianb","mixolydiahn","mixolydianh","mixolydiajn","mixolydianj","mixolydiamn","mixolydianm"],
		// Aeolian
		["aeolian","aeol","eolian","aolian","aelian","aeoian","aeolan","aeolin","aeolia","aaeolian","aeeolian","aeoolian","aeollian","aeoliian","aeoliaan","aeoliann","eaolian","aoelian","aeloian","aeoilan","aeolain","aeolina","qeolian","weolian","seolian","xeolian","zeolian","awolian","a3olian","a4olian","arolian","afolian","adolian","asolian","aeilian","ae9lian","ae0lian","aeplian","aellian","aeklian","aeokian","aeooian","aeopian","aeoluan","aeol8an","aeol9an","aeoloan","aeollan","aeolkan","aeoljan","aeoliqn","aeoliwn","aeolisn","aeolixn","aeolizn","aeoliab","aeoliah","aeoliaj","aeoliam","qaeolian","aqeolian","waeolian","aweolian","saeolian","aseolian","xaeolian","axeolian","zaeolian","azeolian","aweolian","aewolian","a3eolian","ae3olian","a4eolian","ae4olian","areolian","aerolian","afeolian","aefolian","adeolian","aedolian","aseolian","aesolian","aeiolian","aeoilian","ae9olian","aeo9lian","ae0olian","aeo0lian","aepolian","aeoplian","aelolian","aeollian","aekolian","aeoklian","aeoklian","aeolkian","aeoolian","aeoloian","aeoplian","aeolpian","aeoluian","aeoliuan","aeol8ian","aeoli8an","aeol9ian","aeoli9an","aeoloian","aeolioan","aeollian","aeolilan","aeolkian","aeolikan","aeoljian","aeolijan","aeoliqan","aeoliaqn","aeoliwan","aeoliawn","aeolisan","aeoliasn","aeolixan","aeoliaxn","aeolizan","aeoliazn","aeoliabn","aeolianb","aeoliahn","aeolianh","aeoliajn","aeolianj","aeoliamn","aeolianm"],
		// Locrian
		["locrian","loc","ocrian","lcrian","lorian","locian","locran","locrin","locria","llocrian","loocrian","loccrian","locrrian","locriian","locriaan","locriann","olcrian","lcorian","lorcian","lociran","locrain","locrina","kocrian","oocrian","pocrian","licrian","l9crian","l0crian","lpcrian","llcrian","lkcrian","loxrian","lodrian","lofrian","lovrian","loceian","loc4ian","loc5ian","loctian","locgian","locfian","locdian","locruan","locr8an","locr9an","locroan","locrlan","locrkan","locrjan","locriqn","locriwn","locrisn","locrixn","locrizn","locriab","locriah","locriaj","locriam","klocrian","lkocrian","olocrian","loocrian","plocrian","lpocrian","liocrian","loicrian","l9ocrian","lo9crian","l0ocrian","lo0crian","lpocrian","lopcrian","llocrian","lolcrian","lkocrian","lokcrian","loxcrian","locxrian","lodcrian","locdrian","lofcrian","locfrian","lovcrian","locvrian","locerian","locreian","loc4rian","locr4ian","loc5rian","locr5ian","loctrian","locrtian","locgrian","locrgian","locfrian","locrfian","locdrian","locrdian","locruian","locriuan","locr8ian","locri8an","locr9ian","locri9an","locroian","locrioan","locrlian","locrilan","locrkian","locrikan","locrjian","locrijan","locriqan","locriaqn","locriwan","locriawn","locrisan","locriasn","locrixan","locriaxn","locrizan","locriazn","locriabn","locrianb","locriahn","locrianh","locriajn","locrianj","locriamn","locrianm"],
		// Blues
		["blues","lues","bues","bles","blus","blue","bblues","bllues","bluues","bluees","bluess","lbues","bules","bleus","bluse","vlues","glues","hlues","nlues","bkues","boues","bpues","blyes","bl7es","bl8es","blies","blkes","bljes","blhes","bluws","blu3s","blu4s","blurs","blufs","bluds","bluss","bluea","bluew","bluee","blued","bluex","bluez","vblues","bvlues","gblues","bglues","hblues","bhlues","nblues","bnlues","bklues","blkues","bolues","bloues","bplues","blpues","blyues","bluyes","bl7ues","blu7es","bl8ues","blu8es","bliues","bluies","blkues","blukes","bljues","blujes","blhues","bluhes","bluwes","bluews","blu3es","blue3s","blu4es","blue4s","blures","bluers","blufes","bluefs","bludes","blueds","bluses","bluess","blueas","bluesa","bluews","bluesw","bluees","bluese","blueds","bluesd","bluexs","bluesx","bluezs","bluesz"],
		// Chromatic
		["chromatic","hromatic","cromatic","chomatic","chrmatic","chroatic","chromtic","chromaic","chromatc","chromati","cchromatic","chhromatic","chrromatic","chroomatic","chrommatic","chromaatic","chromattic","chromatiic","chromaticc","hcromatic","crhomatic","chormatic","chrmoatic","chroamtic","chromtaic","chromaitc","chromatci","xhromatic","dhromatic","fhromatic","vhromatic","cgromatic","cyromatic","curomatic","cjromatic","cnromatic","cbromatic","cheomatic","ch4omatic","ch5omatic","chtomatic","chgomatic","chfomatic","chdomatic","chrimatic","chr9matic","chr0matic","chrpmatic","chrlmatic","chrkmatic","chronatic","chrojatic","chrokatic","chromqtic","chromwtic","chromstic","chromxtic","chromztic","chromaric","chroma5ic","chroma6ic","chromayic","chromahic","chromagic","chromafic","chromatuc","chromat8c","chromat9c","chromatoc","chromatlc","chromatkc","chromatjc","chromatix","chromatid","chromatif","chromativ","xchromatic","cxhromatic","dchromatic","cdhromatic","fchromatic","cfhromatic","vchromatic","cvhromatic","cghromatic","chgromatic","cyhromatic","chyromatic","cuhromatic","churomatic","cjhromatic","chjromatic","cnhromatic","chnromatic","cbhromatic","chbromatic","cheromatic","chreomatic","ch4romatic","chr4omatic","ch5romatic","chr5omatic","chtromatic","chrtomatic","chgromatic","chrgomatic","chfromatic","chrfomatic","chdromatic","chrdomatic","chriomatic","chroimatic","chr9omatic","chro9matic","chr0omatic","chro0matic","chrpomatic","chropmatic","chrlomatic","chrolmatic","chrkomatic","chrokmatic","chronmatic","chromnatic","chrojmatic","chromjatic","chrokmatic","chromkatic","chromqatic","chromaqtic","chromwatic","chromawtic","chromsatic","chromastic","chromxatic","chromaxtic","chromzatic","chromaztic","chromartic","chromatric","chroma5tic","chromat5ic","chroma6tic","chromat6ic","chromaytic","chromatyic","chromahtic","chromathic","chromagtic","chromatgic","chromaftic","chromatfic","chromatuic","chromatiuc","chromat8ic","chromati8c","chromat9ic","chromati9c","chromatoic","chromatioc","chromatlic","chromatilc","chromatkic","chromatikc","chromatjic","chromatijc","chromatixc","chromaticx","chromatidc","chromaticd","chromatifc","chromaticf","chromativc","chromaticv"],
		// Pentatonic
		["pentatonic","penta","entatonic","pntatonic","petatonic","penatonic","penttonic","pentaonic","pentatnic","pentatoic","pentatonc","pentatoni","ppentatonic","peentatonic","penntatonic","penttatonic","pentaatonic","pentattonic","pentatoonic","pentatonnic","pentatoniic","pentatonicc","epntatonic","pnetatonic","petnatonic","penattonic","penttaonic","pentaotnic","pentatnoic","pentatoinc","pentatonci","oentatonic","0entatonic","lentatonic","pwntatonic","p3ntatonic","p4ntatonic","prntatonic","pfntatonic","pdntatonic","psntatonic","pebtatonic","pehtatonic","pejtatonic","pemtatonic","penratonic","pen5atonic","pen6atonic","penyatonic","penhatonic","pengatonic","penfatonic","pentqtonic","pentwtonic","pentstonic","pentxtonic","pentztonic","pentaronic","penta5onic","penta6onic","pentayonic","pentahonic","pentagonic","pentafonic","pentatinic","pentat9nic","pentat0nic","pentatpnic","pentatlnic","pentatknic","pentatobic","pentatohic","pentatojic","pentatomic","pentatonuc","pentaton8c","pentaton9c","pentatonoc","pentatonlc","pentatonkc","pentatonjc","pentatonix","pentatonid","pentatonif","pentatoniv","opentatonic","poentatonic","0pentatonic","p0entatonic","lpentatonic","plentatonic","pwentatonic","pewntatonic","p3entatonic","pe3ntatonic","p4entatonic","pe4ntatonic","prentatonic","perntatonic","pfentatonic","pefntatonic","pdentatonic","pedntatonic","psentatonic","pesntatonic","pebntatonic","penbtatonic","pehntatonic","penhtatonic","pejntatonic","penjtatonic","pemntatonic","penmtatonic","penrtatonic","pentratonic","pen5tatonic","pent5atonic","pen6tatonic","pent6atonic","penytatonic","pentyatonic","penhtatonic","penthatonic","pengtatonic","pentgatonic","penftatonic","pentfatonic","pentqatonic","pentaqtonic","pentwatonic","pentawtonic","pentsatonic","pentastonic","pentxatonic","pentaxtonic","pentzatonic","pentaztonic","pentartonic","pentatronic","penta5tonic","pentat5onic","penta6tonic","pentat6onic","pentaytonic","pentatyonic","pentahtonic","pentathonic","pentagtonic","pentatgonic","pentaftonic","pentatfonic","pentationic","pentatoinic","pentat9onic","pentato9nic","pentat0onic","pentato0nic","pentatponic","pentatopnic","pentatlonic","pentatolnic","pentatkonic","pentatoknic","pentatobnic","pentatonbic","pentatohnic","pentatonhic","pentatojnic","pentatonjic","pentatomnic","pentatonmic","pentatonuic","pentatoniuc","pentaton8ic","pentatoni8c","pentaton9ic","pentatoni9c","pentatonoic","pentatonioc","pentatonlic","pentatonilc","pentatonkic","pentatonikc","pentatonjic","pentatonijc","pentatonixc","pentatonicx","pentatonidc","pentatonicd","pentatonifc","pentatonicf","pentatonivc","pentatonicv"],
		// Whole
		["whole","hole","wole","whle","whoe","whol","wwhole","whhole","whoole","wholle","wholee","hwole","wohle","whloe","whoel","qhole","2hole","3hole","ehole","dhole","shole","ahole","wgole","wyole","wuole","wjole","wnole","wbole","while","wh9le","wh0le","whple","whlle","whkle","whoke","whooe","whope","wholw","whol3","whol4","wholr","wholf","whold","whols","qwhole","wqhole","2whole","w2hole","3whole","w3hole","ewhole","wehole","dwhole","wdhole","swhole","wshole","awhole","wahole","wghole","whgole","wyhole","whyole","wuhole","whuole","wjhole","whjole","wnhole","whnole","wbhole","whbole","whiole","whoile","wh9ole","who9le","wh0ole","who0le","whpole","whople","whlole","wholle","whkole","whokle","whokle","wholke","whoole","wholoe","whople","wholpe","wholwe","wholew","whol3e","whole3","whol4e","whole4","wholre","wholer","wholfe","wholef","wholde","wholed","wholse","wholes"],
		// Signature
		["signature","sig","ignature","sgnature","sinature","sigature","signture","signaure","signatre","signatue","signatur","ssignature","siignature","siggnature","signnature","signaature","signatture","signatuure","signaturre","signaturee","isgnature","sginature","singature","siganture","signtaure","signautre","signatrue","signatuer","aignature","wignature","eignature","dignature","xignature","zignature","sugnature","s8gnature","s9gnature","sognature","slgnature","skgnature","sjgnature","sifnature","sitnature","siynature","sihnature","sibnature","sivnature","sigbature","sighature","sigjature","sigmature","signqture","signwture","signsture","signxture","signzture","signarure","signa5ure","signa6ure","signayure","signahure","signagure","signafure","signatyre","signat7re","signat8re","signatire","signatkre","signatjre","signathre","signatuee","signatu4e","signatu5e","signatute","signatuge","signatufe","signatude","signaturw","signatur3","signatur4","signaturr","signaturf","signaturd","signaturs","asignature","saignature","wsignature","swignature","esignature","seignature","dsignature","sdignature","xsignature","sxignature","zsignature","szignature","suignature","siugnature","s8ignature","si8gnature","s9ignature","si9gnature","soignature","siognature","slignature","silgnature","skignature","sikgnature","sjignature","sijgnature","sifgnature","sigfnature","sitgnature","sigtnature","siygnature","sigynature","sihgnature","sighnature","sibgnature","sigbnature","sivgnature","sigvnature","sigbnature","signbature","sighnature","signhature","sigjnature","signjature","sigmnature","signmature","signqature","signaqture","signwature","signawture","signsature","signasture","signxature","signaxture","signzature","signazture","signarture","signatrure","signa5ture","signat5ure","signa6ture","signat6ure","signayture","signatyure","signahture","signathure","signagture","signatgure","signafture","signatfure","signatyure","signatuyre","signat7ure","signatu7re","signat8ure","signatu8re","signatiure","signatuire","signatkure","signatukre","signatjure","signatujre","signathure","signatuhre","signatuere","signaturee","signatu4re","signatur4e","signatu5re","signatur5e","signatutre","signaturte","signatugre","signaturge","signatufre","signaturfe","signatudre","signaturde","signaturwe","signaturew","signatur3e","signature3","signatur4e","signature4","signaturre","signaturer","signaturfe","signaturef","signaturde","signatured","signaturse","signatures"],
		// Relative
		["relative","rel","elative","rlative","reative","reltive","relaive","relatve","relatie","relativ","rrelative","reelative","rellative","relaative","relattive","relatiive","relativve","relativee","erlative","rleative","realtive","reltaive","relaitve","relatvie","relatiev","eelative","4elative","5elative","telative","gelative","felative","delative","rwlative","r3lative","r4lative","rrlative","rflative","rdlative","rslative","rekative","reoative","repative","relqtive","relwtive","relstive","relxtive","relztive","relarive","rela5ive","rela6ive","relayive","relahive","relagive","relafive","relatuve","relat8ve","relat9ve","relatove","relatlve","relatkve","relatjve","relatice","relatife","relatige","relatibe","relativw","relativ3","relativ4","relativr","relativf","relativd","relativs","erelative","reelative","4relative","r4elative","5relative","r5elative","trelative","rtelative","grelative","rgelative","frelative","rfelative","drelative","rdelative","rwelative","rewlative","r3elative","re3lative","r4elative","re4lative","rrelative","rerlative","rfelative","reflative","rdelative","redlative","rselative","reslative","reklative","relkative","reolative","reloative","replative","relpative","relqative","relaqtive","relwative","relawtive","relsative","relastive","relxative","relaxtive","relzative","relaztive","relartive","relatrive","rela5tive","relat5ive","rela6tive","relat6ive","relaytive","relatyive","relahtive","relathive","relagtive","relatgive","relaftive","relatfive","relatuive","relatiuve","relat8ive","relati8ve","relat9ive","relati9ve","relatoive","relatiove","relatlive","relatilve","relatkive","relatikve","relatjive","relatijve","relaticve","relativce","relatifve","relativfe","relatigve","relativge","relatibve","relativbe","relativwe","relativew","relativ3e","relative3","relativ4e","relative4","relativre","relativer","relativfe","relativef","relativde","relatived","relativse","relatives"],
		// Random
		["random","randome",	"andom","rndom","radom","ranom","randm","rando","rrandom","raandom","ranndom","randdom","randoom","randomm","arndom","rnadom","radnom","ranodm","randmo","eandom","4andom","5andom","tandom","gandom","fandom","dandom","rqndom","rwndom","rsndom","rxndom","rzndom","rabdom","rahdom","rajdom","ramdom","ransom","raneom","ranrom","ranfom","rancom","ranxom","randim","rand9m","rand0m","randpm","randlm","randkm","randon","randoj","randok","erandom","reandom","4random","r4andom","5random","r5andom","trandom","rtandom","grandom","rgandom","frandom","rfandom","drandom","rdandom","rqandom","raqndom","rwandom","rawndom","rsandom","rasndom","rxandom","raxndom","rzandom","razndom","rabndom","ranbdom","rahndom","ranhdom","rajndom","ranjdom","ramndom","ranmdom","ransdom","randsom","ranedom","randeom","ranrdom","randrom","ranfdom","randfom","rancdom","randcom","ranxdom","randxom","randiom","randoim","rand9om","rando9m","rand0om","rando0m","randpom","randopm","randlom","randolm","randkom","randokm","randonm","randomn","randojm","randomj","randokm","randomk"],
		// ScaleBook
		["ScaleBook","scalebook"],
		// Leland
		["Leland","leland"],
		// Jansen
		["Jansen","jansen"]
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each group of typos
		for (j = 0; j < typo.length; j++) {
			// Loop throuh each typo in the group starting with second element
			for (k = 1; k < typo[j].length; k++) {
				// If the stringArray element matches the typo
				if (stringArray[i] === typo[j][k]) {
					// Replace the typo with the first element (the correction)
					stringArray[i] = typo[j][0];
				}
			}
		}
	}

	return stringArray;

} // End of fixTypo



// Remove "s" from end of words
function removePlural(stringArray) {
	"use strict";

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// If the element of stringArray is not 1 character long
		// ... and the last character is an "s"
		if (stringArray[i].length !== 1 && stringArray[i].charAt(stringArray[i].length-1) === "s") {
			// Remove the last character
			stringArray[i] = stringArray[i].substring(0, stringArray[i].length-1);
		}
	}

	return stringArray;

} // End of removePlural



// Replace synonyms with standard word
function replaceSynonym(stringArray) {
	"use strict";

	// List of synonyms
	var synonym = [
		[
		"random",
		"rando",
		"shuffle",
		"any",
		"pick",
		"surprise",
		"some",
		"whichever",
		"whatever",
		"unsystematic",
		"unmethodical",
		"arbitrary",
		"undirected",
		"indiscrimina",
		"nonspecifi",
		"unspecifi",
		"haphazard",
		"erratic",
		"chance",
		"gamble",
		"fluke"
		],

		[
		"is",
		//"do",
		"does",
		"did",
		"are",
		"was",
		"were",
		"can"
		],

		[
		"reptile",
		"lizard",
		"snake",
		"dinosaur"
		],

		[
		"weigh",
		"weight",
		"mass",
		"bathroom",
		"balance"
		],

		[
		"hello",
		"hi",
		"hey",
		"howdy",
		"greeting",
		"salutation",
		],

		["c", "do"],
		["d", "re"],
		["e", "mi"],
		["f", "fa"],
		["g", "so"],
		["a", "la"],
		["b", "ti"]
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each group of synonyms
		for (j = 0; j < synonym.length; j++) {
			// Loop through each synonym in the group starting with second element
			for (k = 1; k < synonym[j].length; k++) {
				// If stringArray element matches the synonym
				if (stringArray[i] === synonym[j][k]) {
					// Replace synonym with first element in group (i.e. the standard word)
					stringArray[i] = synonym[j][0];
					break;
				}
			}
		}
	}

	return stringArray;

} // End of replaceSynonym



// Rewrite contractions as two words
function rewriteContraction(stringArray) {
	"use strict";

	// List of contractions
	var contraction = [
		["aren't",		"are not"],
		["can't",		"cannot"],
		["couldn't",		"could not"],
		["didn't",		"did not"],
		["doesn't",		"does not"],
		["don't",		"do not"],
		["hadn't",		"had not"],
		["hasn't",		"has not"],
		["haven't",		"have not"],
		["he'd",			"he had"],		 // alternate: he would
		["he'll",		"he will"],		 // alertante: he shall
		["he's",			"he is"],		 // alternate: he has
		["i'd",			"i had"],		 // alternate: i would
		["i'll",			"i will"],		 // alternate: i shall
		["i'm",			"i am"],
		["i've",			"i have"],
		["isn't",		"is not"],
		["it's",			"it is"],		 // alternate: it has
		["let's",		"let us"],
		["mightn't",		"might not"],
		["mustn't",		"must not"],
		["shan't",		"shall not"],
		["she'd",		"she had"],		 // alternate: she would
		["she'll",		"she will"],		 // alternate: she shall
		["she's",		"she is"],		 // alternate: she has
		["shouldn't",	"should not"],
		["that's",		"that is"],		 // alternate: that has
		["there's",		"there is"],		 // alternate: there has
		["they'd",		"they had"],		 // alternate: they would
		["they'll",		"they will"],	 // alternate: they shall
		["they're",		"they are"],
		["they've",		"they have"],
		["we'd",			"we had"],		 // alternate: we would
		["we're",		"we are"],
		["we've",		"we have"],
		["weren't",		"were not"],
		["what'll",		"what will"],	 // alternate: what shall
		["what're",		"what are"],
		["what's",		"what is"],		 // alternate:  what has, what does
		["what've",		"what have"],
		["where's",		"where is"],		 // alternate:; where has
		["who'd",		"who had"], 		 // alternate: who would
		["who'll",		"who will"],		 // alternate; who shall
		["who're",		"who are"],
		["who's",		"who is"], 		 // alternate: who has
		["who've",		"who have"],
		["won't",		"will not"],
		["wouldn't",		"would not"],
		["you'd",		"you had"], 		 // alternate: you would
		["you'll",		"you will"],	 	 // alternate: you shall
		["you're",		"you are"],
		["you've",		"you have"],
		["'sup",			"what is up"]
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each contraction
		for (j = 0; j < contraction.length; j++) {
			// If the element of stringArray matches the contraction
			if (stringArray[i].replace("'", "") === contraction[j][0].replace("'", "")) {
				// Replace contraction with its two-word form
				stringArray[i] = contraction[j][1];
				break;
			}
		}
	}

	// Join array with spaces then split at space
	stringArray = stringArray.join(" ").split(" ");

	return stringArray;

} // End of rewriteContraction



// Convert relevant number words to number
function wordToNumber(stringArray) {
	"use strict";

	// List of numberWords
	var numberWord = [
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve"
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {

		// If stringArray element is "no"
		if (stringArray[i] === "no") {
			// Replace with 0
			stringArray[i] = 0;
			// If the next element of stringArray is "key"
			if (stringArray[i+1] === "key") {
				// Replace "key" with "sharp"
				stringArray[i+1] = "sharp"; // could also use "flat"
				// Do not iterate over next word (it is "sharp")
				i += 1;
			}
		}
		// If stringArray element is "natural" and the following element is "key"
		else if (stringArray[i] === "natural" && stringArray[i+1] === "key") {
			// Replace "natural" with 0
			stringArray[i] = 0;
			// Replace "key" with "sharp"
			stringArray[i+1] = "sharp"; // could also use "flat"
			// Do not iterate over next word (it is "sharp")
			i += 1;
		}
		// Otherwise
		else {
			// Loop through each element of numberWord
			for (j = 0; j < numberWord.length; j++) {
				// If the stringArray element matches the numberWord element
				if (stringArray[i] === numberWord[j]) {
					// Replace the numberWord with it's array index number (i.e. the number)
					stringArray[i] = j;
					break;
				}
			}
		}
	}

	return stringArray;

} // End of wordToNumber



// Perform remove "is" if it follows a pronoun
function pronounEdit(stringArray) {
	"use strict";

	// List of pronouns
	var pronoun = [
		"all","another","any","anybody","anyone","anything","both","each","each other","either","everybody","everyone","everything","few","he","her","hers","herself","him","himself","his","it","its","itself","little","many","me","mine","more","most","much","my","myself","neither","no one","nobody","none","nothing","one","one another","other","others","our","ours","ourselves","several","she","some","somebody","someone","something","that","their","theirs","them","themselves","these","they","this","those","us","we","what","whatever","which","whichever","who","whoever","whom","whomever","whose","you","your","yours","yourself","yourselves"
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each pronoun
		for (j = 0; j < pronoun.length; j++) {
			// If the element of stringArray matches the pronoun and the following element of stringArray "is"
			if (stringArray[i] === pronoun[j] && stringArray[i+1] === "is") {
				// Remove the instance of "is"
				stringArray[i+1] = "";
				// Do not loop over next element of stringArray (it is blank)
				i += 1;
				break;
			}
		}
	}

	return stringArray;

} // End of pronounEdit



// Remove/replace keywords
function removeWordKeywords(stringArray) {
	"use strict";

	// List of keywords
	var keyword = [
		"random",
		"scale",
		"mode",
		"key"
	];

	// List of modes
	var mode = [
		"ionian",
		"dorian",
		"phrygian",
		"lydian",
		"mixolydian",
		"aeolian",
		"locrian"
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each keyword
		for (j = 0; j < keyword.length; j++) {
			// If element of stringArray matches the keyword
			if (stringArray[i] === keyword[j]) {
				// If preceeding element of stringArray is "a"
				if (stringArray[i-1] === "a") {
					// Remove "a" (to avoid confusion with note A)
					stringArray[i-1] = "";
				}
			}
		}
		// If element of stringArray is "pentatonic"
		if (stringArray[i] === "pentatonic") {
			// If the following element of stringArray is "major" or "minor"
			if (stringArray[i-1] === "major" || stringArray[i-1] === "minor") {
				// Remove "major" or "minor"
				stringArray[i-1] = "";
			}
			// If the preceeding element of stringArray is "major" or "minor"
			else if (stringArray[i+1] === "major" || stringArray[i+1] === "minor") {
				// Remove "major" or "minor"
				stringArray[i+1] = "";
				// Skip the next element (it is blank)
				i += 1;
			}
		}
		// If element of stringArray is "how" and preceeding element is "many"
		else if (stringArray[i] === "how" && stringArray[i+1] === "many") {
			// Replace "how" with "key"
			stringArray[i] = "key";
			// Replace "many" with "signature"
			stringArray[i+1] = "signature";
			// If the element preceeding "signature" (was "many") is "sharp" or "flat"
			if (stringArray[i+2] === "sharp" || stringArray[i+2] === "flat") {
				// Remove "sharp" or "flat"
				stringArray[i+2] = "";
				// Skip the next two elements (they are "signature" and "", respecively)
				i += 2;
			}
			// Otherwise
			else {
				// Skip the next element (it is "signature")
				i += 1;
			}
		}
		// Loop through each mode
		for (j = 0; j < mode.length; j++) {
			// If element of stringArray matches the mode
			if (stringArray[i] === mode[j]) {
				// If the following element of stringArray is "mode"
				if (stringArray[i+1] === "mode") {
					// Remove "mode"
					stringArray[i+1] = "";
					// Skip the next element (it is blank)
					i += 1;
					break;
				}
			}
		}
	}

	return stringArray;

} // End of removeWordKeywords



// Add sharp/flat as required to allow for double, triple, etc. accidentals
function multipleAccidental(stringArray) {
	"use strict";

	// List of word multiples
	var wordMultiple = [
		["single",			1],
		["double",			2],
		["triple",			3],
		["quadruple",		4],
		["quintuple",		5],
		["pentuple",		5],
		["sextuple",		6],
		["hextuple",		6],
		["septuple",		7],
		["octuple",			8],
		["nonuple",			9],
		["decuple",			10],
		["hendecuple",	11],
		["undecuple",		11],
		["duodecuple",	12]
	];

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each element of wordMultiple
		for (j = 0; j < wordMultiple.length; j++) {
			// If the element of stringArray matches the first element of wordMultiple
			if (stringArray[i] === wordMultiple[j][0]) {
				// If the next element of stringArray is "sharp" or "flat"
				if (stringArray[i+1] === "sharp" || stringArray[i+1] === "flat") {
					// Replace word multiple with "wordMultiple"
					stringArray[i] = "wordMultiple";
					// Add n-1 of the accidental word to the array (e.g. "triple sharp" becomes "triple sharp sharp sharp")
					for (k = 0; k < wordMultiple[j][1] - 1; k++) {
						stringArray[i] += " " + stringArray[i+1];
					}
				// Skip the next iteration of the loop (it is either "sharp" or "flat")s
				i += 1;
				break;
				}
			}
		}
	}

	// Take out spaces and make each word its own element
	stringArray = stringArray.join(" ").split(" ");

	return stringArray;

} // End of multipleAccidental






/////////// Parse input ///////////


// Scale Score table
var scaleScore = [

//	   item				value	total

	[ // Scale
	["major",				1,		0], // major
	["minor",				1,		0], // minor
	["ionian",			1,		0], // ionian
	["dorian",			1,		0], // dorian
	["phrygian",		1,		0], // phrygian
	["lydian",			1,		0], // lydian
	["mixolydian",	1,		0], // mixolydian
	["aeolian",			1,		0], // aeolian
	["locrian",			1,		0], // locrian
	["blue",				10,		0], // blues
	["chromatic",		10,		0], // chromatic
	["pentatonic",	10,		0], // pentatonic
	["whole",				10,		0]  // whole tone
	],

	[ // White Note
	["c",			1,		0], // c
	["d",			1,		0], // d
	["e",			1,		0], // e
	["f",			1,		0], // f
	["g",			1,		0], // g
	["a",			0.1,	0], // a
	["b",			1,		0]  // b
	],

	[ // Accidental
	["natural",		0,		0], // natural
	["sharp", 		1,		0], // sharp
	["flat",			-1,		0]  // flat
	]

];



// Generate random number between two positive integers
function randomInteger(minimum, maximum) {
	"use strict";

	return Math.floor(Math.random()*(Math.abs(maximum)-Math.abs(minimum)+1)+minimum);

} // End of randomInteger



// Score string for scale, whiteNote, and accidental
function stringScore(stringArray, dimension) {
	"use strict";

	// Convert dimension to scaleScore index
	switch (dimension) {
		case "scale":
			dimension = 0;
			break;
		case "whiteNote":
			dimension = 1;
			break;
		case "accidental":
			dimension = 2;
			break;
	}

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// Loop through each item in dimension
		for (j = 0; j < scaleScore[dimension].length; j++) {
			// If dimension is "scale" the element of stringArray is "mode"
			if (dimension === 0 && stringArray[i] === "mode") {
				// For all modes (ionian, dorian, ..., locrain)
				for (k = 2; k < 9; k++) {
					// Add 1 to scaleScore
					scaleScore[0][k][2] += 1;
				}
				break;
			}
			// If dimension is "scale" and the scaleScore element is "whole"
			else if (dimension === 0 && j === 13) {
				// If the stringArray element is "whole" and the following element is "tone"
				if (stringArray[i] === "whole" && stringArray[i+1] === "tone") {
					// Add 1 to the scaleScore of "whole"
					scaleScore[0][13][2] += 1;
				}
			}
			// If the stringArray element matches the name of the scaleScore element for the given dimension
			else if (stringArray[i] === scaleScore[dimension][j][0]) {
				// Add the element's value to its total
				scaleScore[dimension][j][2] += scaleScore[dimension][j][1];
			}
		}
	}

} // End of stringScore



// Sum scale score elements
function sumScaleScore(dimension) {
	"use strict";

	// Convert dimension to scaleScore index
	switch (dimension) {
		case "scale":
			dimension = 0;
			break;
		case "whiteNote":
			dimension = 1;
			break;
		case "accidental":
			dimension = 2;
			break;
	}

	// Initially assign 0 to value of sum
	var sum = 0;

	// Loop through each element in the scaleScore's dimension
	for (j = 0; j < scaleScore[dimension].length; j++) {
		// Add the total of each element to the sum
		sum += scaleScore[dimension][j][2];
	}

	return sum;

} // End of sumScaleScore



// Zero scaleScore of specified dimension
function zeroScaleScore(dimension) {
	"use strict";

	// Convert dimension to scaleScore index
	switch (dimension) {
		case "scale":
			dimension = 0;
			break;
		case "whiteNote":
			dimension = 1;
			break;
		case "accidental":
			dimension = 2;
			break;
	}

	// For each element in the specified dimension of scaleScore
	for (i = 0; i < scaleScore[dimension].length; i++) {
		// Set the element's total to zero
		scaleScore[dimension][i][2] = 0;
	}

} // End of zeroScaleScore



function getHighestValue(dimension) {
	"use strict";

	// Convert dimension to scaleScore index
	switch (dimension) {
		case "scale":
			dimension = 0;
			break;
		case "whiteNote":
			dimension = 1;
			break;
		case "accidental":
			dimension = 2;
			break;
	}

	// Get highest value in array
	// Initially assign null to inde
	var index = null;
	// Initially assign 0 to value
	var value = 0;
	// Loop through each element of the specified scaleScore dimension
	for (i = 0; i < scaleScore[dimension].length; i++) {
		// If the scaleScore element's total is greater than value
		if (scaleScore[dimension][i][2] > value) {
			// Replace value with the scaleScore element's total
			value = scaleScore[dimension][i][2];
			// Replace index with the index of the scaleScore's element
			index = i;
		}
	}

	// Check for ties
	// Initially assign false to tie
	var tie = false;
	// Loop through each element of the specified scaleScore dimension
	for (i = 0; i < scaleScore[dimension].length; i++) {
		// If the scaleScore element being evaluated is not index
		// ... and the scaleScore total for that element is equal to value
		if (i !== index && scaleScore[dimension][i][2] === value) {
			// A tie exists
			tie = true;
			break;
		}
	}

	// If a tie does not exist
	if (tie === false) {
		// Return the scale, whiteNote, or accidental with the highest value
		return scaleScore[dimension][index][0];
	}
	// Otherwise
	else {
		// Return null
		return null;
	}

} // End of getHighestValue



// Determine key signature of string
// Note: Returns null if key signature is not found
// Note: Only finds first key signature in string
function determineKeySignatureFromString(stringArray) {
	"use strict";

	// Originally assign null to keySignature
	var keySignature = null;

	// Loop through each element of stringArray
	for (i = 0; i < stringArray.length; i++) {
		// If stringArray element contains a number between 0 and 7
		if (stringArray[i] >= 0 && stringArray[i] <= 7) {
			// If element following number is "sharp"
			if (stringArray[i+1] === "sharp") {
				// Key signature is that number
				keySignature = stringArray[i];
				// Remove number
				stringArray[i] = "";
				// Remove "sharp"
				stringArray[i+1] = "";
				// If elements following "sharp" are "or" and "flat"
				if (stringArray[i+2] === "or" && stringArray[i+3] === "flat") {
					// Remove "flat"
					stringArray[i+3] = "";
				}
				// If element following "sharp" is "flat"
				else if (stringArray[i+2] === "flat") {
					// Remove "flat"
					stringArray[i+2] = "";
				}
				break;
			}
			// If element following number is "flat"
			else if (stringArray[i+1] === "flat") {
				// Key signature is negative that number
				keySignature = -1 * stringArray[i];
				// Remove number
				stringArray[i] = "";
				// Remove "flat"
				stringArray[i+1] = "";
				// If elements following "flat" are "or" and "sharp"
				if (stringArray[i+2] === "or" && stringArray[i+3] === "sharp") {
					// Remove "sharp"
					stringArray[i+3] = "";
				}
				// If element following "flat" is "sharp"
				else if (stringArray[i+2] === "sharp") {
					// Remove "flat"
					stringArray[i+2] = "";
				}
				break;
			}
		}
	}

	return keySignature;

} // End of determineKeySignatureFromString



// Array of white note names and corresponding note numbers
var whiteNoteChart = [
	[0,  "C"],
	[2,  "D"],
	[4,  "E"],
	[5,  "F"],
	[7,  "G"],
	[9,  "A"],
	[11, "B"]
];



// Convert white note name to number
function whiteNoteNameToNumber(whiteNoteName) {
	"use strict";

	// Write note in upperCase
	whiteNoteName = whiteNoteName.toUpperCase();
	// Loop through each element of whiteNoteChart
	for (i = 0; i < whiteNoteChart.length; i++) {
		// If whiteNoteName matches the letter in whiteNoteChart
		if (whiteNoteName === whiteNoteChart[i][1]) {
			// Return the number corresponding to that note
			return whiteNoteChart[i][0];
		}
	}

} // End of whiteNoteNameToNumber



// Determine key signature name
function determineKeySignatureName(keySignature) {
	"use strict";


	var keySignatureName;

	// If key signature is null
	if (keySignature === null) {
		// Key signature name is null
		keySignatureName = null;
	}
	// If key signature is flat (i.e. less than 0)
	else if (Number(keySignature) < 0) {
		// Key signature name is (positive) number of flats + "flat"
		keySignatureName = -1 * keySignature + " flat";
	}
	// If key signature is sharp (i.e. greater than 0)
	else if (Number(keySignature) > 0) {
		// Key signature anme is number of sharps + "sharp"
		keySignatureName = keySignature + " sharp";
	}
	// If key signature is 0
	else if (Number(keySignature) === 0) {
		// Key signature name is "0 sharps or flats"
		keySignatureName = "0 sharps or flats";
	}

	// If key signature is not 0 and not 1
	if (Math.abs(keySignature) !== 0 && Math.abs(keySignature) !== 1) {
		// Add "s" to end of key signature name to make plural
		keySignatureName += "s";
	}

	return keySignatureName;

} // End of determineKeySignatureName



// Determine white note name
function determineWhiteNoteName(note) {
	"use strict";

	// Initially assign null to whiteNoteName
	var whiteNoteName = null;

	// Loop through each element of whiteNoteChart
	for (i = 0; i < whiteNoteChart.length; i++) {
		// If the note (number) matches the number in the element of whiteNoteChart
		if (note === whiteNoteChart[i][0]) {
			// Assign the note letter corresponding to the number to whiteNoteName
			whiteNoteName = whiteNoteChart[i][1];
			break;
		}
	}

	return whiteNoteName;

} // End of determineWhiteNoteName




var enharmonicList = [
											 ["C-flat",		"B"],
											 ["C",				"B-sharp"],
											 ["C-sharp",	"D-flat"],
											 ["D-flat", 	"C-sharp"],
											 ["D",				"None"],
											 ["D-sharp", 	"E-flat"],
											 ["E-flat",		"D-sharp"],
											 ["E",				"F-flat"],
											 ["E-sharp",	"F"],
											 ["F-flat",		"E"],
											 ["F",				"E-sharp"],
											 ["F-sharp",	"G-flat"],
											 ["G-flat",		"F-sharp"],
											 ["G",				"None"],
											 ["G-sharp",	"A-flat"],
											 ["A-flat",		"G-sharp"],
											 ["A",				"None"],
											 ["A-sharp",	"B-flat"],
											 ["B-flat",		"A-sharp"],
											 ["B",				"C-flat"],
											 ["B-sharp",	"C"]
										 ];

function determineEnharmonic(noteName, scaleName) {

	"use strict";

	var noteNumber = whiteNoteNameToNumber(noteName[0].toUpperCase());
	if (noteName.indexOf("sharp") > -1) {
		noteNumber += 1;
		noteNumber = (noteNumber+12)%12;
		scaleScore[2][1][2] += scaleScore[2][1][1];
	}
	else if (noteName.indexOf("flat") > -1) {
		noteNumber -= 1;
		noteNumber = (noteNumber+12)%12;
		scaleScore[2][2][2] += scaleScore[2][2][1];
	}

	scaleName = determineScaleName(scaleName);

	var scaleIndex;
	// Loop through major, minor, and modes in scaleScore scale element
	for (i = 0; i < scaleScore[0].length; i++) {
		// If specified scale matches scale element of scaleScore
		if (scaleName === scaleScore[0][i][0]) {
			// Set the scaleIndex to the scale's position in scaleScore
			scaleIndex = i;
			break;
		}
	}


	var keySignature = determineKeySignature(noteNumber, scaleName);

	var enharmonicNoteName;
	for (i = 0; i < enharmonicList.length; i++) {
		if (noteName === enharmonicList[i][0]) {
			enharmonicNoteName = enharmonicList[i][1];
			break;
		}
	}

	var enharmonicNoteExists = false;
	var enharmonicKeySignature;
	if (keySignature === 0) {

		// If scale is not major, minor, or mode
		if (scaleIndex > 8) {

					enharmonicNoteExists = false; // !!! Check this but I believe it is true
		}
		else {
			// If note is a black note
			if (noteName.indexOf("sharp") > -1 || noteName.indexOf("flat") > -1) {
				enharmonicNoteExists = true;
			}
			// If note is a white note
			else {
				enharmonicNoteExists = false;
			}
		}
	}

	else if (keySignature > 0) {
		for (enharmonicKeySignature = -7; enharmonicKeySignature < 0; enharmonicKeySignature++) {
			if (determineNote(scaleName, enharmonicKeySignature) === noteNumber) {
				enharmonicNoteExists = true;
				break;
			}
		}
	}

	else if (keySignature < 0) {
		for (enharmonicKeySignature = 1; enharmonicKeySignature < 8; enharmonicKeySignature++) {
			if (determineNote(scaleName, enharmonicKeySignature) === noteNumber) {
				enharmonicNoteExists = true;
				break;
			}
		}
	}


	if (enharmonicNoteExists === false) {
		enharmonicNoteName = "None";
	}


	return enharmonicNoteName;


} // End of determineEnharmonic






// Determine note name
function determineNoteName(note, keySignature, scaleName) {
	"use strict";

	// Determine white note name
	var noteName = determineWhiteNoteName(note);

	keySignature = Number(keySignature);

	if (note === "undefined") {
		noteName = "undefined";
	}
	// Otherwise
	else {
		// Find the noteName
		// Will return null if note is not a white note
		noteName = determineWhiteNoteName(note);

		// If note is not a white note (i.e. determineWhiteNoteName returns null)
		if (noteName === null) {
			// If accidental scaleScore is negative (i.e. note accidental is flat)
			if (sumScaleScore("accidental") < 0 || (keySignature < 0 && keySignature > -8)) {
				// Go up one semitone to white note, find white note name, and add "flat" to end of noteName
				noteName = determineWhiteNoteName(note+1) + "-flat";
			}
			// If accidental scaleScore is positive (i.e. note accidental is sharp)
			else if (sumScaleScore("accidental") > 0 || (keySignature > 0 && keySignature < 8)) {
				// Go down one semitone to white note, find white note name, and add "sharp" to end of noteName
				noteName = determineWhiteNoteName(note-1) + "-sharp";
			}
		}
	}


	// If note is 11 and has a key signature of 6 or 7 flats or sum of the accidental scaleScore is negative
	if (note === 11 && (keySignature === -6 || keySignature === -7)) {
		// The note name is "C-flat"
		noteName = "C-flat";
	}
	else if (note === 4 && keySignature === -7) {
		// The note name is "F-flat"
		noteName = "F-flat";
	}
	else if (note === 5 && (keySignature === 6 || keySignature === 7)) {
		// The note name is "E-sharp"
		noteName = "E-sharp";
	}
	else if (note === 0 && keySignature === 7) {
		// The note name is "B-sharp"
		noteName = "B-sharp";
	}
	// If the keySignature is sharp but the noteName contains "flat" or vice versa
	// if ((keySignature < 0 && sumScaleScore("accidental") > 0) || (keySignature > 0 && sumScaleScore("accidental") < 0)) {
	else if ((keySignature > 0 && noteName.indexOf("flat") > -1) || (keySignature < 0 && noteName.indexOf("sharp") < -1)) {
		// NoteName is enharmonic noteName
		for (i = 0; i < enharmonicList.length; i++) {
			if (noteName === enharmonicList[i][0]) {
				noteName = enharmonicList[i][1];
				break;
			}
		}
	}

	return noteName;

} // End of determineNoteName



// Determine scale name
function determineScaleName(scale) {
	"use strict";

	// Initialize scaleName
	var scaleName;

	// If scale is "blue"
	if (scale === "blue") {
		// Assign "blues" to scaleName
		scaleName = "blues";
	}
	// If scale is "whole"
	else if (scale === "whole") {
		// Assign "whole tone" to scaleName
		scaleName = "whole tone";
	}
	// Otherwise
	else {
		// scaleName is scale
		scaleName = scale;
	}

	return scaleName;

} // End of determineScaleName






/////////// Reverse lookup ///////////



// List of semitones between scale and relative major
var modeConversion = [
	["ionian",		 	 0], ["major",	0],
	["dorian",			-2],
	["phrygian",		-4],
	["lydian",			-5],
	["mixolydian",	-7],
	["aeolian",			-9], ["minor", -9],
	["locrian",			-11]
];



// Find note given scale and key signature
function determineNote(scale, keySignature) {
	"use strict";

	// Loop through each element of modeConversion
	for (i = 0; i < modeConversion.length; i++) {
		// If the entry in the zeroth element of modeConversion matches the scale
		if (modeConversion[i][0] === scale) {
			// Scale is the number of semitones to relative major
			scale = modeConversion[i][1];
			break;
		}
	}

	// Find note using scale and key signature
	// Start on note 7 octaves above 0 (lowest MIDI C)
	// Go up (negative times negative) from relative major to relative scale
	// Go up/down 7 semitones (perfect fifth) times the key signature to find the starting note
	// Take modulus 12 to find note in first octave
	var note = (7*12 - scale + 7 * keySignature)%12;

	return note;

} // End of determineNote



// Find scale type given a starting note and key signature
function determineScale(note, keySignature) {
	"use strict";

	// Determine scale difference (between scale and its relative major)
	// Start on note 7 octaves above 0 (lowest MIDI C)
	// Go up/down 7 semitones (perfect fifth) times the key signature
	// Take modulus 12 to find note in first octave
	var scaleDifference = note + (12*7 - 7 * keySignature)%12;
	// Add 12 to scale to ensure positive value
	// Multiply by -1 to make negative
	// Take modulus 12 to find note in first octave (value is negative)
	scaleDifference = (-1 * (12 + scaleDifference))%12;

	// Declare scaleName
	var scaleName;
	// Loop through each element of modeConversion
	for (i = 0; i < modeConversion.length; i++) {
		// If the first element of modeConversion matches the value determined for scale
		if (modeConversion[i][1] === scaleDifference) {
			// Scale is the zeroth element of modeConversion (i.e. scale name)
			scaleName = modeConversion[i][0];
			break;
		}
	}

	return scaleName;

} // End of determineScale



// Find the key signature given a starting note and scale
function determineKeySignature(note, scale) {
	"use strict";

	// Initialize keySignature and scaleIndex
	var keySignature, scaleIndex;

	// Loop through major, minor, and modes in scaleScore scale element
	for (i = 0; i < scaleScore[0].length; i++) {
		// If specified scale matches scale element of scaleScore
		if (scale === scaleScore[0][i][0]) {
			// Set the scaleIndex to the scale's position in scaleScore
			scaleIndex = i;
			break;
		}
	}

	// If the scale is not a major, minor, or mode (i.e. has scaleIndex greater than 8)
	if (scaleIndex > 8) {
		// The scale has a key signature of 0 sharps or flats
		keySignature = 0;
	}

	// Otherwise
	else {

		// Initially assign 0 to scaleDifference
		var scaleDifference = 0;
		// Get difference between ionian (major) scale and other scale using modeConversion array
		// Loop through modeConversion array
		for (i = 0; i < modeConversion.length; i++) {
			// If the zeroth element of modeConversion matches the scale
			if (modeConversion[i][0] === scale) {
				// Get the scaleDifference from the first element
				scaleDifference = modeConversion[i][1];
				break;
			}
		}

		// Determine the relative major note
		var relativeMajorNote = note + scaleDifference;

		// Set key signature to 0 (no sharps or flats)
		keySignature = 0;

		// Test for sharp key signatures (up to 7 sharps)
		// If the relativeMajorNote is not C (i.e. 0) and the accidental scaleScore is greater than or equal to 0 (i.e. sharp)
		if (relativeMajorNote%12 !== 0 && sumScaleScore("accidental") >= 0) {
			// Loop through seven sharp key signatures
			for (i = 0; i < 8; i++) {
				// Go down seven semitones
				relativeMajorNote -= 7;
				// Increment key signature by one (add one sharp)
				keySignature += 1;
				// If relativeMajorNote is C
				if (relativeMajorNote%12 === 0) {
					break;
				}
			}
		}

		// If a sharp key signature is not found, test for flat key signatures (up to 7 flats)
		// If relativeMajorNote is not C (i.e. 0) and and the accidental scaleScore is less or equal to than 0 (i.e. flat)
		if (relativeMajorNote%12 !== 0 && sumScaleScore("accidental") <= 0) {
			// Reset relativeMajorNote
			relativeMajorNote = note + scaleDifference;
			// Reset keySignature to zero
			keySignature = 0;
			// Loop through seven flat key signatures
			for (i = 0; i < 8; i++) {
				// Go up seven semitones
				relativeMajorNote += 7;
				// Decrement key signature by one (add one flat)
				keySignature -= 1;
				// If relativeMajorNote is C
				if (relativeMajorNote%12 === 0) {
					break;
				}
			}
		}

		// If key signature is less than seven (has more than 7 flats)
		if (keySignature < -7) {
			// Reset relativeMajorNote
			relativeMajorNote = note + scaleDifference;
			// Reset keySignature to zero
			keySignature = 0;
			// Loop through seven sharp key signatures
			for (i = 0; i < 8; i++) {
				// Go down seven semitones
				relativeMajorNote -= 7;
				// Increment key signature by one (add one sharp)
				keySignature += 1;
				// If relativeMajorNote is C
				if (relativeMajorNote%12 === 0) {
					break;
				}
			}
		}
		// If key signature is greater than seven (has more than 7 sharps)
		else if (keySignature > 7) {
			// Reset relativeMajorNote
			relativeMajorNote = note + scaleDifference;
			// Reset keySignature to zero
			keySignature = 0;
			// Loop through seven flat key signatures
			for (i = 0; i < 8; i++) {
				// Go up seven semitones
				relativeMajorNote += 7;
				// Decrement key signature by one (add one flat)
				keySignature -= 1;
				// If relativeMajorNote is C
				if (relativeMajorNote%12 === 0) {
					break;
				}
			}
		}

		// If key signature is still less than -7 (has more than 7 flats) or greater than 7 (has more than 7 sharps)
		if (keySignature < -7 || keySignature > 7) {
			// Key signature is 0 sharps or flats
			keySignature = 0;
		}

	} // End of else

	return Number(keySignature);

} // End of determineKeySignature


// Check if given scale on given note has given key signature
function checkInput(note, scale, keySignature) {
	"use strict";

	// If the specified key signature is equivalent to the computed key signature computed using the note and scale type
	if (Number(keySignature) === Number(determineKeySignature(note, scale))) {
		// The specified information agrees, thus is true
		return true;
	}
	else {
		// The specified information does not agree, thus is false
		return false;
	}

} // End of checkInput






// List key signature notes
function listKeySignatureNotes(keySignature) {
	"use strict";

	var keySignatureList;
	var note;

	// If key signature is natural
	if (keySignature === 0) {
		keySignatureList = "";
	}
	// If key signature is sharp
	else if (keySignature > 0) {
		// Set note to major fifth (7 semitones) below F-sharp
		note = 11;
		keySignatureList = "<br/>" + "(";
		for (k = 0; k < keySignature; k++) {
			// Go up major 5th (7 semitones)
			note += 7;
			// If keySignature is not 1 sharp and it is not the first time through the loop
			if (keySignature !== 1 && k !== 0) {
				// Add comma and space
				keySignatureList += "," + " ";
			}
			// Add note name to key signature
			keySignatureList += determineWhiteNoteName((note-1)%12) + "-sharp";
		}
		keySignatureList += ")";
	}
	// If key signature is flat
	else if (keySignature < 0) {
		// Set note to eight major fifths (8 * 7 semitones) above F
		note = 5 + 12*7;
		keySignatureList = "<br/>" + "(";
		for (k = 0; k < -1*keySignature; k++) {
			// Go down major fifth from note
			note -= 7;
			// If keySignature is not 1 flat and it is not the first time through the loop
			if (keySignature !== -1 && k !== 0) {
				// Add comma and space
				keySignatureList += "," + " ";
			}
			// Add note name to key signatures
			keySignatureList += determineWhiteNoteName((note+1)%12) + "-flat";
		}
		keySignatureList += ")";
	}

	return keySignatureList;

} // End of listKeySignatureNotes



// Style text with HTML markup
function textStyle(string) {
	"use strict";

	if (string !== null) {
		return string
			// Replace hyphen with space
			.replace(/-/g, " ")
			// Replace " sharps or flats" with " #/b"
			.replace(/ sharps or flats/g, "<span class='musicText'>#</span>/<span class='musicText'>b</span>")
			// Replace "sharps" with "#"
			.replace(/ sharps/g, "<span class='musicText'>#</span>")
			// Replace " sharp" with "#"
			.replace(/ sharp/g, "<span class='musicText'>#</span>")
			// Replace " flats" with "b"
			.replace(/ flats/g, "<span class='musicText'>b</span>")
			// Replace " flat" with "b"
			.replace(/ flat/g, "<span class='musicText'>b</span>");
	}
	else {
		return null;
	}

} // End of textStyle











/////////// parseUserInput ///////////


function parseUserInput(userInput) {
	"use strict";


	// Transform user input

	// If userInput is undefined (AngularJS assigns blank form as undefined)
	if (userInput === undefined) {
		// Replace with blank string
		userInput = "";
	}

	// Convert all letters to lower case
	//userInput = userInput.toLowerCase();
	var transformInput = userInput.toLowerCase();

	// Convert certain special characters
	transformInput = replaceSpecialCharacters(transformInput);

	// Convert string to array splitting at spaces
	transformInput = transformInput.split("-");

	// Convert certain letters to accidentals
	transformInput = letterToAccidental(transformInput);

	// Split at hyphen (need to join array first)
	transformInput = transformInput.join("-").split("-");

	// Find and replace typos
	transformInput = fixTypo(transformInput);

	// Remove "s" from end of words
	transformInput = removePlural(transformInput);

	// Replace synonyms
	transformInput = replaceSynonym(transformInput);

	// Rewrite contractions
	transformInput = rewriteContraction(transformInput);

	// Convert relevant number words to number
	transformInput = wordToNumber(transformInput);

	// Perform remove "is" if it follows a pronoun (e.g. "what", "that", etc.)
	transformInput = pronounEdit(transformInput);

	// Remove/replace keywords
	transformInput = removeWordKeywords(transformInput);

	// Add sharp/flat as required to allow for double, triple, etc. accidentals
	transformInput = multipleAccidental(transformInput);



	// Parse input

	// Set scaleScore to zero
	zeroScaleScore("scale");
	zeroScaleScore("whiteNote");
	zeroScaleScore("accidental");

	// Determine key signature
	// Returns null if key signature is not found
	// Note: determineKeySignatureFromString modifies transformInput
	var keySignature = determineKeySignatureFromString(transformInput);


	// Score string for scale, whiteNote, and accidental
	stringScore(transformInput, "scale");
	stringScore(transformInput, "whiteNote");
	stringScore(transformInput, "accidental");


	// If accidental is not specified and more than one note are specified and B has a scaleScore greater than zero
	if (sumScaleScore("accidental") === 0 && sumScaleScore("whiteNote") > 1 && scaleScore[1][6][2] > 0) {
		// Subtract 1 from B's scaleScore
		scaleScore[1][6][2] -= 1;
		// Subtract 1 from flat's scaleScore
		scaleScore[2][2][2] -= 1;
	}


	// If the note "a" is specified and at least one sharp is specified
	if (scaleScore[1][5][2] <= 1 && scaleScore[2][1][2] <= 1) {

		if (sumScaleScore("whiteNote") > 1) {
			// Subtract a's scaleScore value from its total
			scaleScore[1][5][2] -= scaleScore[1][5][1];
		}
	}

	// Assume transformInput does not contain "is", "what", "random", "relative", "key", "scale", "mode", or "go"
	var containsIs = false;
	var containsWhat = false;
	var containsRandom = false;
	var containsRelative = false;
	var containsKey = false;
	var containsScale = false;
	var containsMode = false;
	var containsGo = false;

	// Loop through each element of transformInput
	for (i = 0; i < transformInput.length; i++) {
		// If element of transformInput is...
		switch (transformInput[i]) {
			case "is":
				// Change containsKey to true
				containsIs = true;
				break;
			case "what":
				// Change containsWhat to true
				containsWhat = true;
				break;
			case "random":
				// Change containsRandom to true
				containsRandom = true;
				break;
			case "relative":
				// Change containsRelative to true
				containsRelative = true;
				break;
			case "key":
				// Change containsKey to true
				containsKey = true;
				break;
			case "scale":
				// Change containsScale to true
				containsScale = true;
				break;
			case "mode":
				// Change containsMode to true
				containsMode = true;
				break;
			case "go":
				// Change containsGo to true
				containsGo = true;
				break;
		}
	}


	// Initialize startScaleIndex
	var startScaleIndex;
	var endScaleIndex;

	// If transformInput does not contain "what", keySignature is specified, and the scaleScore of "a" is 0.1
	if (containsWhat === true && keySignature !== null && scaleScore[1][5][2] === 0.1) {
		// Zero the scaleScore of "a"
		scaleScore[1][5][2] = 0;
	}


	// Determine the scale (scale with the highest total in scaleScore)
	// Returns null if a tie exists or scale is not specified
	var scale = getHighestValue("scale");


	// Determine the note
	// Initally assign null to note
	var note = null;
	// If whiteNote is specified
	if (getHighestValue("whiteNote") !== null) {
		// Convert whiteNote to a number and add accidental
		// Add 144 such that number is always positive
		// Modulus 12 gives lowest note number
		note = (12*12 + whiteNoteNameToNumber(getHighestValue("whiteNote")) + sumScaleScore("accidental"))%12;
	}

	// Declare variables
	var keySignatureName;
	var noteName;
	var scaleName;
	var interpretation;
	var answer;
	var action;

	// Action: Go to answer
	action = "answer";



	// If transformInput is blank
	if (transformInput.toString() === "") {
		// Interpretation is blank
		interpretation = "";
		// Answer is blank
		answer = "";
	}
	// If everything (i.e. note, scale, and keySignature) is specified
	else if (note !== null && scale !== null && keySignature !== null) {

		// Count the number of times "not" appears in the string

		// Assume string does not contain a "not"
		var notCount = 0;
		// Loop through each element of transformInput
		for (i = 0; i < transformInput.length; i++) {
			// If element of transformInput is "not"
			if (transformInput[i] === "not") {
				// Add 1 to notCount
				notCount += 1;
			}
		}

		// Evaluate if certain scale starting on certain note has certain key signature
		answer = checkInput(note, scale, keySignature);

		// Determine the key signature, scale, and note names
		keySignatureName = determineKeySignatureName(keySignature);
		scaleName = determineScaleName(scale);
		noteName = determineNoteName(note, keySignature, scaleName);


		// If "not" appears an odd number of times in the string
		if (notCount%2 !== 0) {
			// Answer is opposite (i.e. true -> false, false -> true)
			answer = !answer;
			// Interpretation
			interpretation = "Does the" + " " + "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + " " + "not have a key signature of" + " " + textStyle(keySignatureName) + "?";
		}
		// If "not" appears an even number of times in the string
		else {
			// Interpretation
			interpretation = "Does the" + " " + "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + " " + "have a key signature of" + " " + textStyle(keySignatureName) + "?";
		}

		var yesSynonyms = ["yes","certainly","absolutely","definitely","indeed","affirmative"];

		// Get answer
		switch (answer) {
			// If answer is "true"
			case true:
				// Answer is "Yes"
				answer = yesSynonyms[randomInteger(0, yesSynonyms.length-1)];
				break;
			// If answer is "false"
			case false:
				// Answer is "No"
				answer = "No";
				break;
		}

	}


	// If note is specified, scale and key signature are null, and two major, minor, or modes are specified
	else if (note !== null && scale === null && keySignature === null && sumScaleScore("scale") === 2) {

		// Determine white note name
		var whiteNoteName = determineWhiteNoteName(note-sumScaleScore("accidental")).toLowerCase();

		// Assign null to whiteNoteIndex, and names and indices of first scale and second scale
		var whiteNoteIndex = null;
		var firstScaleName = null;
		var firstScaleIndex = null;
		var secondScaleName = null;
		var secondScaleIndex = null;

		// Loop through each element of transformInput
		for (i = 0; i < transformInput.length; i++) {
			// If the element of transformInput matches the whiteNoteName
			if (transformInput[i] === whiteNoteName) {
				// Assign the array position of the transformInput element to whiteNoteIndex
				whiteNoteIndex = i;
			}
			// If the element of transformInput does not match the whiteNoteName
			else {
				// Loop through each major, minor, and mode in scaleScore
				for (j = 0; j < 9; j++) {
					// If the element of transformInput matches the scale name in scaleScore
					// and the scale in scaleScore has a value of 1 (i.e. was mentioned in userInput)
					// and no firstScaleName is specified
					if (transformInput[i] === scaleScore[0][j][0] && scaleScore[0][j][2] === 1 && firstScaleName === null) {
						// Assign scale to firstScaleName
						firstScaleName = scaleScore[0][j][0];
						// Assign the index of the scale in transformInput to firstScaleIndex
						firstScaleIndex = i;
					}
					// If the element of transformInput matches the scale name in scaleScore
					// and the scale in scaleScore has a value of 1 (i.e. was mentioned in userInput)
					// and firstScaleName is specified
					else if (transformInput[i] === scaleScore[0][j][0] && scaleScore[0][j][2] === 1 && firstScaleName !== null) {
						// Assign scale to secondScaleName
						secondScaleName = scaleScore[0][j][0];
						// Assign the index of the scale in transformInput to secondScaleIndex
						secondScaleIndex = i;
					}
					// If both firstScaleName and secondScaleName are specified
					if (firstScaleName !== null && secondScaleName !== null) {
						// Break out of scaleScore loop
						break;
					}
				}
			}
			// If both firstScaleName and secondScaleName are specified
			if (firstScaleName !== null && secondScaleName !== null) {
				// Break out of transformInput loop
				break;
			}
		}

		// Declare variables
		var relativeScale;
		var givenScale;

		// If whiteNoteIndex < firstScaleIndex < secondScaleIndex
		if (whiteNoteIndex < firstScaleIndex && whiteNoteIndex < secondScaleIndex) {
			// The scale associated with a note in the input is the first scale
			givenScale = firstScaleName;
			// The relative scale desired is the second scale
			relativeScale = secondScaleName;
		}
		// If firstScaleIndex < whiteNoteIndex < secondScaleIndex
		// or firstScaleIndex < secondScaleIndex < whiteNoteIndex
		else {
			// The scale associated with a note in the input is the first scale
			givenScale = secondScaleName;
			// The relative scale desired is the second scale
			relativeScale = firstScaleName;
		}

		// Determine note name
		noteName = determineNoteName(note, keySignature, givenScale);

		// Interpretation
		interpretation = "What" + " " + relativeScale + " " + "scale is relative to the" + " " + "<a href='/scale?/" + noteName + "/#/" + givenScale.replace(/\s+/g, "") + "'>" + givenScale + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "?";

		// Find key signature of given scale
		keySignature = determineKeySignature(note, givenScale);
		// Find note of relative scale
		note = determineNote(relativeScale, keySignature);
		// scaleName
		scaleName = relativeScale;
		// Find note name of relative scale note
		noteName = determineNoteName(note, keySignature, relativeScale);
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// If transformInput contains "go"
		if (containsGo === true) {
			// Go directly to scale (do not go to answer)
			action = "scale";
		}

	}

	// If note and scale are specified but key signature is not, and the string contains relative
	else if (note !== null && scale !== null && keySignature === null && containsRelative === true) {
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Create blank answer (might not be necessary)
		answer = "";
		// If transformInput contains "mode"
		if (containsMode === true) {
			// Interpretation
			interpretation = "What modes are relative to the" + " " + "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "?";
			// Start scales at scaleScore scale index of 2 (i.e. ionian)
			startScaleIndex = 2;
		}
		// If transformInput does not contain "mode"
		else {
			// Interpretation
			interpretation = "What scales are relative to the" + " " + "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "?";
			// Start scales at scaleScore scale index of 2 (i.e. major)
			startScaleIndex = 0;
		}
		// Loop through scales starting at startScaleIndex
		for (k = startScaleIndex; k < 9; k++) {
			scale = scaleScore[0][k][0];
			// Determine scale name
			scaleName = determineScaleName(scale);
			// Determine note based on scale
			note = determineNote(scale, keySignature);
			// Determine note name
			noteName = determineNoteName(note, keySignature, scaleName);
			// If the scale is not "locrian" (the last scale at index 8 of scale element of scaleScore)
			if (k !== 8) {
				// Add answer (capitalize scale name)
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "<br/>";
			}
			// If the scale is "locrian"
			else {
				// Add answer (capitalize scale name)
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
			}
		}
	}


	// If note and scale are specified but keySignature is not
	// ... and containsKey is false
	else if (note !== null && scale !== null && keySignature === null && containsKey === false) {
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Interpretation
		interpretation = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// If note and scale are specified but keySignature is not
	// ... and containsKey is true (and containsScale and containsMode are false)
	else if (note !== null && scale !== null && keySignature === null && containsKey === true) {
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine key signature name
		keySignatureName = determineKeySignatureName(keySignature);
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Interpretation
		interpretation = "What is the key signature of the" + " " + "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "?";
		// Answer
		answer = textStyle(keySignatureName + listKeySignatureNotes(keySignature));
	}

	// If just note is specified and containsRandom is false
	else if (note !== null && scale === null && keySignature === null && containsScale === false && containsMode === false && containsRandom === false) {
		// Assume desired scale is major
		scale = "major";
		scaleName = "major";
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Interpretation
		interpretation = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// If scale and key signature are specified but note is not
	else if (note === null && scale !== null && keySignature !== null) {
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine key signature name
		keySignatureName = determineKeySignatureName(keySignature);
		// Interpretation
		interpretation = "What" + " " + scaleName + " " + "scale has a key signature of" + " " + textStyle(keySignatureName) + "?";
		// Determine note based on scale
		note = determineNote(scale, keySignature);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);

		// If noteName is defined (i.e. not null)
		if (noteName.indexOf("null") === -1) {
			// Answer
			answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
			// If transformInput contains "go"
			if (containsGo === true) {
				// Go directly to scale (do not go to answer)
				action = "scale";
			}
		}
		// If note is "null" (i.e. could not be determined)
		else {
			// Answer
			answer = "No such scale exists";
		}

	}

	// If just key signature is spefified
	else if (note === null && scale === null && keySignature !== null && containsRandom === false) {
		// Determine key signature name
		keySignatureName = determineKeySignatureName(keySignature);
		// Create blank answer (might not be necessary)
		answer = "";
		// End scales at scaleScore scale index of 8+1 (i.e. locrain)
		endScaleIndex = 8;
		// If transformInput contains "mode"
		if (containsMode === true) {
			// Interpretation
			interpretation = "What modes have a key signature of" + " " + textStyle(keySignatureName) + "?";
			// Start scales at scaleScore scale index of 2 (i.e. ionian)
			startScaleIndex = 2;
		}
		// If transformInput does not contain "mode"
		else {
			// Interpretation
			interpretation = "What scales have a key signature of" + " " + textStyle(keySignatureName) + "?";
			// Start scales at scaleScore scale index of 2 (i.e. major)
			startScaleIndex = 0;
		}
		// Loop through scales starting at startScaleIndex
		for (k = startScaleIndex; k <= endScaleIndex; k++) {
			scale = scaleScore[0][k][0];
			// Determine scale name
			scaleName = determineScaleName(scale);
			// Determine note based on scale
			note = determineNote(scale, keySignature);
			// Determine note name
			noteName = determineNoteName(note, keySignature, scaleName);
			// If between listing minor and ionian
			if(k === 2 && startScaleIndex !== 2) {
				answer += "&#151;" + "<br/>";
			}
			// If not at the last scale to be listed
			if (k !== endScaleIndex) {
				// Add answer and line break
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "<br/>";
			}
			// If the last scale to be listed
			else {
				// Add answer and without line break
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
			}
		}
	}

	// If note and key signature are specified but scale is not
	else if (note !== null && scale === null && keySignature !== null && containsRandom === false) {
		// Determine note name
		noteName = determineNoteName(note, keySignature, null);
		// Determine key signature name
		keySignatureName = determineKeySignatureName(keySignature);
		// Interpretation
		interpretation = "What scale built on" + " " + textStyle(noteName) + " " + "has a key signature of" + " " + textStyle(keySignatureName) + "?";
		// Determine scale
		scale = determineScale(note, keySignature);
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine note name (again)
		noteName = determineNoteName(note, keySignature, scaleName);
		// If transformInput does not contain mode
		if (containsMode === false) {
			// If scaleName is "ionain"
			if (scaleName === "ionian") {
				// Change scaleName to "major"
				scaleName = "major";
			}
			// If scaleName is "aeolian"
			else if (scaleName === "aeolian") {
				// Change scaleName to "minor"
				scaleName = "minor";
			}
		}

		// If scale is a number
		if (!isNaN(parseInt(scaleName))) {
			// Answer
			answer = "There does not exist such a scale";
		}
		else {
			// Answer
			answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		}
		// If transformInput contains "go"
		if (containsGo === true) {
			// Go directly to scale (do not go to answer)
			action = "scale";
		}

	}

	// If note is specified but scale and key signature are not, and transformInput contains "scale" or "mode"
	else if (note !== null && scale === null && keySignature === null && containsRandom === false && (containsScale === true || containsMode === true)) {
		// Determine note name
		noteName = determineNoteName(note, keySignature, null);
		// If transformInput contains "scale"
		if (containsScale === true) {
			// Interpretation
			interpretation = "What scales are built on" + " " + textStyle(noteName) + "?";
			// Start scales at scaleScore scale index of 0 (i.e. major), end at last scale
			startScaleIndex = 0;
			endScaleIndex = scaleScore[0].length;
		}
		// If transformInput contains "mode"
		else if (containsMode === true) {
			// Interpretation
			interpretation = "What modes are built on" + " " + textStyle(noteName) + "?";
			// Start scales at scaleScore scale index of 2 (i.e. ionian)
			startScaleIndex = 2;
			endScaleIndex = 8+1;
		}
		// Create blank answer (might not be necessary)
		answer = "";
		// Loop through scales starting at startScaleIndex
		for (k = startScaleIndex; k < endScaleIndex; k++) {
			scale = scaleScore[0][k][0];
			// Determine scale name
			scaleName = determineScaleName(scale);
			// Determine key signature
			keySignature = determineKeySignature(note, scale);
			// Determine note name
			noteName = determineNoteName(note, keySignature, scaleName);
			// If between listing minor and ionian, or locrian and blues
			if((k === 2 && startScaleIndex !== 2) || (k === 9 && endScaleIndex !== 9)) {
				answer += "&#151;" + "<br/>";
			}
			// If not at the last scale to be listed
			if (k !== endScaleIndex-1) {
				// Add answer and line break
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>" + "<br/>";
			}
			// If the last scale to be listed
			else {
				// Add answer and without line break
				answer += "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
			}
		}
	}

	// If nothing is specified and containsRandom is true
	else if (note === null && scale === null && keySignature === null && containsRandom === true) {
		// If transformInput contains "mode"
		if (containsMode === true) {
			// Interpretation
			interpretation = "Generate a random mode";
			// Generate a random mode
			scale = scaleScore[0][randomInteger(2, 8)][0];
		}
		// If transformInput does not contain "mode"
		else {
			// Interpretation
			interpretation = "Generate a random scale";
			// Generate a random scale (any)
			scale = scaleScore[0][randomInteger(0, scaleScore[0].length-1)][0];
		}
		note = randomInteger(0, 11);
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// If just note is specified and containsRandom is true
	else if (note !== null && scale === null && keySignature === null && containsRandom === true) {
		// If transformInput contains "mode"
		if (containsMode === true) {
			// Generate a random mode
			scale = scaleScore[0][randomInteger(2, 8)][0];
			// Determine key signature
			keySignature = determineKeySignature(note, scale);
			// Determine note name
			noteName = determineNoteName(note, keySignature, null);
			// Interpretation
			interpretation = "Generate a random mode built on" + " " + textStyle(noteName);
		}
		// If transformInput does not contain "mode"
		else {
			// Generate a random scale (any)
			scale = scaleScore[0][randomInteger(0, scaleScore[0].length-1)][0];
			// Determine key signature
			keySignature = determineKeySignature(note, scale);
			// Determine note name
			noteName = determineNoteName(note, keySignature, null);
			// Interpretation
			interpretation = "Generate a random scale built on" + " " + textStyle(noteName);
		}
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// If just scale is specified /*and contains random is true*/
	else if (note === null && scale !== null && keySignature === null /*&& containsRandom === true*/) {
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Interpretation
		interpretation = "Generate a random" + " " + scaleName + " " + "scale";
		// Generate a random note
		note = randomInteger(0, 11);
		// Determine key signature
		keySignature = determineKeySignature(note, scale);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// If just keySignature is specified and containsRandom is true
	else if (note === null && scale === null && keySignature !== null && containsRandom === true) {
		// Determine key signature name
		keySignatureName = determineKeySignatureName(keySignature);
		// If transformInput contains "mode"
		if (containsMode === true) {
			// Interpretation
			interpretation = "Generate a random mode with a key signature of" + " " + textStyle(keySignatureName);
			// Generate a random mode
			scale = scaleScore[0][randomInteger(2, 8)][0];
		}
		else {
			// Interpretation
			interpretation = "Generate a random scale with a key signature of" + " " + textStyle(keySignatureName);
			// Generate a random major, minor, or mode
			scale = scaleScore[0][randomInteger(0, 8)][0];
		}
		// Determine scale name
		scaleName = determineScaleName(scale);
		// Determine note
		note = determineNote(scale, keySignature);
		// Determine note name
		noteName = determineNoteName(note, keySignature, scaleName);
		// Answer
		answer = "<a href='/scale?/" + noteName + "/#/" + scaleName.replace(/\s+/g, "") + "'>" + scaleName.charAt(0).toUpperCase() + scaleName.slice(1) + " " + "scale built on" + " " + textStyle(noteName) + "</a>";
		// Action: Go to scale
		action = "scale";
	}

	// Silly query interpretations and answers
	else if (transformInput.join(" ").indexOf("ph") > -1) {
		interpretation = "pH scale";
		answer = "Titrations? Let's take things down an octave and drop the base!";
	}
	else if (transformInput.join(" ").indexOf("richter") > -1) {
		interpretation = "Richter scale";
		answer = "Trying to shake things up, are we?";
	}
	else if (transformInput.join(" ").indexOf("decibel") > -1) {
		interpretation = "Decibel scale";
		answer = "Let's make some noise!";
	}
	else if (transformInput.join(" ").indexOf("fish") > -1) {
		interpretation = "Fish scale";
		answer = "I sea there's something about fishy about your query...";
	}
	else if (transformInput.join(" ").indexOf("reptile") > -1) {
		interpretation = "Lizard scale";
		answer = "What kind of tiles won't stay on the floor? Reptiles!";
	}
	else if (transformInput.join(" ").indexOf("log") > -1) {
		interpretation = "Logarithmic scale";
		answer = "Why are mathematicians also good musicians? They know their log-a-rythms!";
	}
	else if (transformInput.join(" ").indexOf("justice") > -1) {
		interpretation = "Justice scale";
		answer = "ScaleBook can give you an objective answer... So long as it is about music.";
	}
	else if (transformInput.join(" ").indexOf("weig") > -1) {
		interpretation = "Weigh scale";
		answer = "If you want that scale, you'll have to weight.";
	}
	else if (transformInput.join(" ").indexOf("life") > -1 || transformInput.join(" ").indexOf("universe") > -1 || transformInput.join(" ").indexOf("everything") > -1) {
		interpretation = "Answer to the Ultimate Question of Life, the Universe, and Everything";
		answer = "42";
	}
	else if (transformInput.join(" ").indexOf("hello") > -1) {
		interpretation = userInput.charAt(0).toUpperCase() + userInput.slice(1);
		answer = "Greetings!";
	}
	else if (transformInput.join(" ").indexOf("up") > -1) {
		interpretation = "What's up?";
		answer = "Note much";
	}
	else if (transformInput.join(" ").indexOf("ScaleBook") > -1) {
		interpretation = "ScaleBook";
		answer = "Hey, that's me!";
	}
	else if (transformInput.join(" ").indexOf("Leland") > -1 || transformInput.join(" ").indexOf("Jansen") > -1) {
		interpretation = "Leland Jansen";
		answer = "He made ScaleBook";
	}
	else if (transformInput.join(" ").indexOf("scale") > -1 && transformInput.join(" ").indexOf("1") > -1 && transformInput.join(" ").indexOf("10") > -1) {
		interpretation = "On a scale from one to ten...";
		answer = randomInteger(1, 10).toString();
	}


	else if (transformInput.join(" ").indexOf("error") > -1) {
		interpretation = "Report an error";
		answer = "What seems to be the problem?";
		action = "error";
	}

	else if (transformInput.join(" ") === "cpanel") {
		interpretation = "Go to cPanel";
		answer = "Hello, Leland!";
		action = "cpanel";
	}

	else if (transformInput.join(" ") === "github") {
		interpretation = "Go to GitHub";
		answer = "Let's git to it!";
		action = "github";
	}

	// Otherwise query cannot be interpreted
	else {
		// Interpretation
		interpretation = "???";
		// Answer
		answer = "ScaleBook cannot understand your query."  + "<br/>" + "<span style='font-size: 12pt'><span class='colorLight'>If this is a mistake, please <u><a href='#/error'>report an error</a></u>.</span></span>";
	}

	// If interpretation is not "ph scale"
	if (interpretation !== "pH scale") {
		// Capitalize first letter of interpretation
		interpretation = interpretation.charAt(0).toUpperCase() + interpretation.slice(1);
	}

	// Capitalize first letter of answer
	answer = answer.charAt(0).toUpperCase() + answer.slice(1);


	// Return an array containing the interpretation, answer, action, note, scale, and key signature
	return [interpretation, answer, action, noteName, scaleName, keySignatureName];


} // End of parseUserInput












function generateScale(startNoteName, scalePattern) {
	"use strict";

	var startNote = 0;
	var scaleArray =	[
											[],	// MIDI notes
											[],	// White notes MIDI
											[],	// Accidental MIDI
											[]	// Written note
										];

  // Find the number corresponding with the start note name
	// Loop through each element of whiteNoteChart
	for (i = 0; i < whiteNoteChart.length; i++) {
		// If the first character of startNoteName matches the note name in whiteNoteChart
		if (startNoteName[0].toUpperCase() === whiteNoteChart[i][1]) {
			// Add the corresponding MIDI number to startNote
			startNote += whiteNoteChart[i][0];
			break;
		}
	}

	// Assign the first (zeroth) element of scaleArray White note MIDI to startNote
	scaleArray[1][0] = startNote;

	// Add seven consecutive white notes to white notes MIDI
	for (j = 1; j < whiteNoteChart.length; j++) {
		scaleArray[1][j] = (whiteNoteChart[(i+j)%7][0])%12;
	}

	// If startNoteName contains "sharp"
	if (startNoteName.indexOf("sharp") > -1) {
		// Add 1 to the startNote
		startNote += 1;
	}
	// If startNoteName contains "flat"
	else if (startNoteName.indexOf("flat") > -1) {
		// Subtract 1 from startNote
		startNote -= 1;
	}

	// Assign the first (zeroth) element of scaleArray MIDI note to startNote
	scaleArray[0].push(startNote);

  // Generate the scale using numbers
  // Loop through each element of scalePattern starting at the second element
	for (i = 1; i < scalePattern.length; i++) {
		// Add the element of scalePatten to the previous element of scalePattern
    // Convert to base 12
    scaleArray[0][i] = (scaleArray[0][i-1] + scalePattern[i-1])%12;
	}

  // Loop through the length of scalePattern
	for (i = 0; i < scalePattern.length; i++) {
		// Subtract the scale number from the white note number
    // Convert to base 12
    scaleArray[2][i] = (scaleArray[0][i] - scaleArray[1][i])%12;
		// If the subtraction results in 11 (this is necessary due to numbers being in base 12)
    if (scaleArray[2][i] === 11) {
			// Change 11 to -1
      scaleArray[2][i] = -1;
		}
	}

  // Initialize found variable (represents whether or not the whiteNote has been found)
	var found;
	// Loop through the length of the first element of scaleArray
  for (i = 0; i < scaleArray[0].length; i++) {
		// Set found to false (the white note has not yet been found)
    found = false;
		// Loop through the length of whiteNoteChart
    for (j = 0; j < whiteNoteChart.length; j++) {
			// If the note number in the first element of scaleArray matches
      // the number in the zeroth element of whiteNoteChart
      if (scaleArray[1][i] === whiteNoteChart[j][0]) {
				// Set the third element of scaleArray to the name of that white note
        scaleArray[3][i] = whiteNoteChart[j][1];
				// The whiteNote has been found
        found = true;
			}
			// If the second element of scaleArray is 1 (i.e. sharp)
      if (scaleArray[2][i] === 1) {
				// Add "-sharp" to the end of the white note name in the third element of scaleArray
        scaleArray[3][i] += "-sharp";
			}
      // If the second element of scaleArray is -1 (i.e. flat)
			else if (scaleArray[2][i] === -1) {
				// Add "-sharp" to the end of the white note name in the third element of scaleArray
        scaleArray[3][i] += "-flat";
			}
      // If the whiteNote was found
			if (found === true) {
				// Break out of the loop
        break;
			}
		}
	}

	return scaleArray;

} // End of generateScale






// That's all folks!
