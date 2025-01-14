/*jshint esversion: 6 */
/*jshint multistr: true */

/* Original script by:
      Skype: RobinKuiper.eu
      Discord: Atheos#1095
      Roll20: https://app.roll20.net/users/1226016/robin
      Reddit: https://www.reddit.com/user/robinkuiper/
      Patreon: https://www.patreon.com/robinkuiper

    Further modifications by Matt DeKok
       Discord: Sillvva#2532
       Roll20: https://app.roll20.net/users/494585/sillvva
       Github: https://github.com/sillvva/Roll20APIScripts

    Fantasy Ground adaptation by David Berkompas
       Skype: david.berkompas
       Discord: BoomerET#2354
       Fantasy Grounds: BoomerET
       Github: https://github.com/BoomerET
       Reddit: https://www.reddit.com/user/BoomerET
       Roll20: https://app.roll20.net/users/9982/boomeret
       Paypal.me: https://paypal.me/boomeret
       (All contributions are donated to Hospice,
          or go here: https://www.hollandhospice.org/giving/donate-now/)
*/

var startXML = "";
var endXML = "";
var allXML = "";
var npcArmor = "";

var payFlag = 1;

var pcFilename = "";
var addHP = 0;

var dexBonus = 0;

var specialDefense = "";

var charSpellSlots1 = 0;
var charSpellSlots2 = 0;
var charSpellSlots3 = 0;
var charSpellSlots4 = 0;
var charSpellSlots5 = 0;
var charSpellSlots6 = 0;
var charSpellSlots7 = 0;
var charSpellSlots8 = 0;
var charSpellSlots9 = 0;

var holdFeatures = [];
var holdProf = [];

var hasAppear = 0;

var casterLevels = 0;
var casterClasses = 0;

var totalClasses = 0;

var foundLegacy = false;

/* * * * * * * * */
const _ABILITIES = {
	1: "STR",
	2: "DEX",
	3: "CON",
	4: "INT",
	5: "WIS",
	6: "CHA"
};
const _ABILITY = {
	"STR": "strength",
	"DEX": "dexterity",
	"CON": "constitution",
	"INT": "intelligence",
	"WIS": "wisdom",
	"CHA": "charisma"
};
const justAbilities = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

const skills = ["acrobatics", "animal_handling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleight_of_hand", "stealth", "survival"];
const skillsRef = ["dexterity", "wisdom", "intelligence", "strength", "charisma", "intelligence", "wisdom", "charisma", "intelligence", "wisdom", "intelligence", "wisdom", "charisma", "charisma", "intelligence", "dexterity", "dexterity", "wisdom"];
const simpleMeleeWeapon = ["club", "dagger", "greatclub", "handaxe", "javelin", "light_hammer", "mace", "quartrsfaff", "sickle", "spear"];
const simpleRangedWeapon = ["crossbow_light", "dart", "showtbow", "sling"];
const martialMeleeWeapon = ["battleaxe", "flail", "glaive", "greataxe", "greatsword", "halberd", "lance", "longsword", "maul", "morningstar", "pike", "rapier", "scimitar", "shortsword", "trident", "war_pick", "warhammer", "whip"];
const martialRangedWeapon = ["blowgun", "crossbow_hand", "crossbow_heavy", "longbow", "net"];
const tieflingRacialTraits = ["darkvision", "hellish_resistance"];

var object;

const fullDexArmor = ["padded", "leather", "studded_leather"];
const max3DexArmor = [];
const max2DexArmor = ["hide", "chain_shirt", "scale_mail", "breastplate", "half_plate"];
const noDexArmor = ["ring_mail", "chain_mail", "splint", "plate"];

var totalLevels = 0;
var totalHP = 0;
var isArtificer = 0;
var isBarbarian = 0;
var isBard = 0;
var isCleric = 0;
var isDruid = 0;
var isFighter = 0;
var isMonk = 0;
var isPaladin = 0;
var isRanger = 0;
var isRogue = 0;
var isSorcerer = 0;
var isWarlock = 0;
var isWizard = 0;
var isBloodHunter = 0;
var isDragonborn = 0;
var isDwarf = 0;
var isElf = 0;
var isHalfling = 0;
var isHalfOrc = 0;
var isHalfElf = 0;
var isHuman = 0;
var isTiefling = 0;
var isGnome = 0;
var isAarakocra = 0;
var isGenasi = 0;
var isGoliath = 0;
var isAasimar = 0;
var isBugbear = 0;
var isFirbolg = 0;
var isGoblin = 0;
var isHobgoblin = 0;
var isKenku = 0;
var isKobold = 0;
var isLizardfolk = 0;
var isOrc = 0;
var isTabaxi = 0;
var isTriton = 0;
var isYyantiPureblood = 0;
var isFeralTiefling = 0;
var isTortle = 0;
var isGith = 0;
var isChangling = 0;
var isKalashtar = 0;
var isShifter = 0;
var isWarforged = 0;
var isCentaur = 0;
var isLoxodon = 0;
var isMinotaur = 0;
var isSimicHybrid = 0;
var isVedalken = 0;
var levelBarbarian = 0;
var levelBard = 0;
var levelCleric = 0;
var levelDruid = 0;
var levelFighter = 0;
var levelMonk = 0;
var levelPaladin = 0;
var levelRanger = 0;
var levelRogue = 0;
var levelSorcerer = 0;
var levelWarlock = 0;
var levelWizard = 0;
var levelBloodHunter = 0;
var levelArtificer = 0;
var isTough = 0;
var isAlert = 0;

var fighterSubclassEldritchKnight = 0;
var rogueSubclassArcaneTrickster = 0;

var barbRages = 0;
var barbPrimalPath = "";
var barbTotemSpirit = "";
var barbBeastAspect = "";

var bardCollege = "";
var clericDomain = "";
var druidCircle = "";
var fighterArchetype = "";
var monkWay = "";
var paladinOath = "";
var rangerArchtype = "";
var rogueArchetype = "";
var sorcererOrigin = "";
var warlockPatron = "";
var wizardSchool = "";

var wearingArmor = 0;
var usingHeavyArmor = 0;
var usingMediumArmor = 0;
var usingLightArmor = 0;
var usingShield = 0;

var numArrows = 0;
var numNeedles = 0;
var numBolts = 0;
var numBullets = 0;

var addBonusArmorAC = 0;
var addBonusOtherAC = 0;
var addSavingThrows = 0;

var addSpeed = 0;

var strScore = 0;
var strMod = 0;
var strProf = 0;
var chaScore = 0;
var chaMod = 0;
var chaProf = 0;
var conScore = 0;
var conMod = 0;
var conProf = 0;
var intScore = 0;
var intMod = 0;
var intProf = 0;
var dexScore = 0;
var dexMod = 0;
var dexProf = 0;
var wisScore = 0;
var wisMod = 0;
var wisProf = 0;

var hpBarbarian = 7;
var hpBard = 5;
var hpCleric = 5;
var hpDruid = 5;
var hpFighter = 6;
var hpMonk = 5;
var hpPaladin = 6;
var hpRanger = 6;
var hpRogue = 5;
var hpSorcerer = 4;
var hpWarlock = 5;
var hpWizard = 4;
var hpBloodHunter = 6;
var hpArtificer = 5;

var hpStartBarbarian = 12;
var hpStartBard = 8;
var hpStartCleric = 8;
var hpStartDruid = 8;
var hpStartFighter = 10;
var hpStartMonk = 8;
var hpStartPaladin = 10;
var hpStartRanger = 10;
var hpStartRogue = 8;
var hpStartSorcerer = 6;
var hpStartWarlock = 8;
var hpStartWizard = 6;
var hpStartBloodhunter = 10;
var hpStartArtificer = 8;

var sumHP = 0;

var mamFeat = 0;
var alertFeat = 0;
var mobileFeat = 0;
var obsFeat = 0;
var profBonus = 0;
var passWisBonus = 0;

var charWalk = 0;

/* * * * * * * * * * */

var glCharID = "";

$(function() {
	//$("#getcharID").val("39540987")
	dispLinks.init();
	clLinks.init();
	donateFGC.init();

	$("#Linkwindow").jqxWindow("close");
	$("#CLwindow").jqxWindow("close");
	$("#DONwindow").jqxWindow("close");
	$("#grabChar").jqxButton({
		width: "150px",
		height: "35px",
		theme: "darkblue"
	});
	$("#textHere").jqxTextArea({
		theme: "darkblue",
		width: 750,
		height: 150,
		placeHolder: "XML will appear here."
	});
	$("#getcharID").jqxInput({
		placeHolder: "Enter Character ID",
		height: "35px",
		width: 200,
		minLength: 4,
		theme: "darkblue"
	});
	$("#dlChar").jqxButton({
		width: "120px",
		height: "35px",
		theme: "darkblue"
	});
	$("#resetChar").jqxButton({
		width: "120px",
		height: "35px",
		theme: "darkblue"
	});
	$("#jqxMenu").jqxMenu({
		width: 95,
		height: "145px",
		mode: "vertical",
		theme: "darkblue"
	});
	$("#jqxMenu").css("visibility", "visible");

	$('#extLinks').click(function(e) {
		e.preventDefault();
		$('#Linkwindow').jqxWindow('open');
	});
	$('#goHome').click(function(e) {
		e.preventDefault();
		window.location.reload(false);
	});
	$('#contactUs').click(function(e) {
		e.preventDefault();
		window.open("https://www.fantasygrounds.com/forums/showthread.php?82766-D-amp-D-Beyond-converter-for-2024-PHB-to-FGU-Player-Characters", "_blank");
	});
	$('#showChangelog').click(function(e) {
		e.preventDefault();
		$('#CLwindow').jqxWindow('open');
	});
	$('#showDonations').click(function(e) {
		e.preventDefault();
		$('#DONwindow').jqxWindow('open');
	});

	$('#grabChar').on("click", function() {
	    if(!$('#getcharID').val().trim().match(/\d+/)) {
	        alert("Um, please enter your Character ID");
	    } else if ($('#textHere').val() != "")  {
	        var resetMe = confirm("You need to clear previous data, do you want me to do that for you?");
	        if (resetMe == 1) {
	            window.location.reload(false);
	        }
	    } else {
	        $.ajax({
	            data: { charID:  $('#getcharID').val().trim() },
	            url: 'scripts/getChar.php',
	            method: 'GET',
	            success: function(data) {
	                try {
	                    parseCharacter($.parseJSON(data));
	                } catch(e) {
	                    alert("Unable to parse character: " + $('#getcharID').val().trim());
	                    console.error(e);
	                    return;
	                }
	            },
	            failure: function(msg) {
	                alert("Unable to find character: " + $('#getcharID').val().trim());
	                return;
	            }
	        });
	    }
	});



	//$.getJSON('characters/DwarfFighter.json', function(data) {
		//$.getJSON('characters/CompTiefSorc_DnDB.json', function(data) {
		//$.getJSON('characters/TestSubClass-Goliath.json', function(data) {
		//$.getJSON('characters/WoodElf.json', function(data) {
		//$.getJSON('characters/DrowElf.json', function(data) {
		//$.getJSON('characters/CloudGiant.json', function(data) {
		//$.getJSON('characters/FrostGiant.json', function(data) {
		//$.getJSON('characters/HillGiant.json', function(data) {
		//$.getJSON('characters/StormGiant.json', function(data) {
		//$.getJSON('characters/StoneGiant.json', function(data) {
	//	parseCharacter(data);
	//});
	//console.log("Starting conversion.");

	$("#dlChar").on("click", function() {
		if ($("#textHere").val() == "") {
			alert("You need to load a character first.");
			return;
		}
		if (pcFilename == "" || pcFilename == null) {
			var ts = Math.round((new Date()).getTime() / 1000);
			pcFilename = ts + ".xml";
		} else {
			pcFilename += ".xml";
		}

		var textFile = new Blob([$("#textHere").val()], {
			type: 'text/plain'
		});
		invokeSaveAsDialog(textFile, pcFilename);
	});

	$("#popCharID").on("change", function(event) {
		var firstNumber = event.args.item.label.indexOf("(");
		var secondNumber = event.args.item.label.indexOf(")");
		glCharID = event.args.item.label.substring(firstNumber + 1, secondNumber);
		$('#getcharID').val(glCharID);
	});

	$("#resetChar").on("click", function() {
		window.location.reload(false);
	});
});

function parseCharacter(inputChar) {
	let charType = $('input[name="import_type"]:checked').val();
	var charStatus = jQuery.extend(true, {}, inputChar);
	var character = jQuery.extend(true, {}, inputChar.data);
	if (charStatus.hasOwnProperty("errorCode")) {
		var alertString = " could not be found.\n";
		alertString += "Either the character doesn't actually exist,\n";
		alertString += "or the character is set to 'Private' instead of 'Public'.\n\n";
		alertString += "Yes, your character MUST be set to PUBLIC.";
		alert("Character " + $("#getcharID").val() + alertString);
		return;
	} else {
		$.each(character.inventory.definition, function(key43, value43) {
			if (value43.isLegacy == true) {
				foundLegacy = true;
			}
		});
		$.each(character.spells.race, function(key44, value44) {
			if (value44.isLegacy == true) {
				foundLegacy = true;
			}
		});
		if (character.race.isLegacy == true) {
			foundLegacy = true;
		}
		$.each(character.spells.class, function(key45, value45) {
			if (value45.isLegacy == true) {
				foundLegacy = true;
			}
		});
		$.each(character.classSpells.spells, function(key46, value46) {
			if (value46.isLegacy == true) {
				foundLegacy = true;
			}
		});
		if (foundLegacy == true) {
			alertString = " has some Legacy items being used.\n";
			alertString += "This tool has been designed specifically for the 2024 Players handbook.\n";
			alertString += "Things may work, or they may not. That's the chance you're taking.\n";
			alert("Character " + $("#getcharID").val() + alertString);
		}
		startXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
		startXML += "<root version=\"4.3\" dataversion=\"20220901\" release=\"8.1|CoreRPG:6\">\n";
		if (charType == "pc") {
			startXML += "\t<character>\n";
			endXML = "\t</character>\n</root>\n";
		} else {
			startXML += "\t<npc>\n";
			endXML = "\t</npc>\n</root>\n";
		}

		allXML = startXML;

		$.each(character.feats, function(keyFeat, valFeat) {
			if (valFeat.definition.name == "Tough") {
				isTough = 1;
			} else if (valFeat.definition.name == "Alert") {
				isAlert = 1;
			}
		});

		var buildXML = "\t\t<!--" + $("#getcharID").val().trim() + "-->\n";
		var npcXML = "\t\t<!--" + $("#getcharID").val().trim() + "-->\n";
		if (character.name != "" || character.name != null) {
			pcFilename = character.name.replace(/\W/g, '');
		}
		buildXML += "\t\t<name type=\"string\">" + character.name + "</name>\n";
		npcXML += "\t\t<name type=\"string\">" + character.name + "</name>\n";

		var startingClassID = 0;
		var backgroundID = 0;
		backgroundID = character.background.definition.id;
    //console.log("Background ID: " + backgroundID);

    if(character.traits.personalityTraits != null) {
        buildXML += "\t\t<personalitytraits type=\"string\">" + fixQuote(character.traits.personalityTraits) + "</personalitytraits>\n";
    }
    if(character.traits.ideals != null) {
        buildXML += "\t\t<ideals type=\"string\">" + fixQuote(character.traits.ideals) + "</ideals>\n";
    }
    if(character.traits.bonds != null) {
        buildXML += "\t\t<bonds type=\"string\">" + fixQuote(character.traits.bonds) + "</bonds>\n";
    }
    if(character.traits.flaws != null) {
        buildXML += "\t\t<flaws type=\"string\">" + fixQuote(character.traits.flaws) + "</flaws>\n";
    }
		$.each(character.classes, function(key, value) {
			if (value.isStartingClass == true) {
				$.each(value.definition.classFeatures, function(key01, value01) {
					if (value01.name == 'Core ' + value.definition.name + ' Traits') {
						startingClassID = value01.id;
					}
				});
			}
		});

		switch (character.race.baseName.toLowerCase()) {
			case 'aasimar':
				isAasimar = 1;
				break;
			case 'dragonborn':
				isDragonborn = 1;
				break;
			case 'dwarf':
				isDwarf = 1;
				break;
			case 'elf':
				isElf = 1;
				break;
			case 'gnome':
				isGnome = 1;
				break;
			case 'goliath':
				isGoliath = 1;
				break;
			case 'halfling':
				isHalfling = 1;
				break;
			case 'human':
				isHuman = 1;
				break;
			case 'orc':
				isOrc = 1;
				break;
			case 'tiefling':
				isTiefling = 1;
				break;
		}

		buildXML += "\t\t<abilities>\n";
		npcXML += "\t\t<abilities>\n";
		justAbilities.some(function(thisAbility, ja) {
			abilScore = parseInt(getTotalAbilityScore(character, ja + 1));
			if (abilScore > 20) {
				abilScore = 20;
			}
			modScore = parseInt(abilScore / 2) - 5;
			if (thisAbility == "strength") {
				strScore = abilScore;
				strMod = modScore;
			} else if (thisAbility == "dexterity") {
				dexScore = abilScore;
				dexMod = modScore;
				dexBonus = modScore;
			} else if (thisAbility == "constitution") {
				conScore = abilScore;
				conMod = modScore;
			} else if (thisAbility == "intelligence") {
				intScore = abilScore;
				intMod = modScore;
			} else if (thisAbility == "wisdom") {
				wisScore = abilScore;
				wisMod = modScore;
			} else if (thisAbility == "charisma") {
				chaScore = abilScore;
				chaMod = modScore;
			}
			buildXML += "\t\t\t<" + thisAbility + ">\n";
			npcXML += "\t\t\t<" + thisAbility + ">\n";
			buildXML += "\t\t\t\t<bonus type=\"number\">" + modScore + "</bonus>\n";
			npcXML += "\t\t\t\t<bonus type=\"number\">" + modScore + "</bonus>\n";

			buildXML += "\t\t\t\t<savemodifier type=\"number\">" + addSavingThrows + "</savemodifier>\n";
			character.modifiers.class.some(function(thisMod) {
				// No idea why this has to be 468
				if ((thisMod.subType == thisAbility + "-saving-throws") && thisMod.type == "proficiency") {
					if (thisMod.componentId == startingClassID) {
						buildXML += "\t\t\t\t<saveprof type=\"number\">1</saveprof>\n";
					}
					// Figure out how to set substring(thisAbility) + Prof = 1
					eval('var ' + thisAbility.substring(1, 4) + 'Prof = 1;');
				}
			});
			buildXML += "\t\t\t\t<score type=\"number\">" + abilScore + "</score>\n";
			buildXML += "\t\t\t</" + thisAbility + ">\n";
			npcXML += "\t\t\t\t<score type=\"number\">" + abilScore + "</score>\n";
			npcXML += "\t\t\t</" + thisAbility + ">\n";
		});
		buildXML += "\t\t</abilities>\n";
		npcXML += "\t\t</abilities>\n";

		// Attempt at skill list
		var idCount = 1;
		var hasHalf = 0;
		//var halfProf = false;
		var profValue = 0;
		var halfprof = getObjects(character, 'type', 'half-proficiency');
		for (var x in halfprof) {
			var hfprof = halfprof[x];
			var type = hfprof.subType;
			if (type == 'ability-checks') {
				hasHalf = 1;
			}
		}
		buildXML += "\t\t<skilllist>\n";
		skills.some(function(element) {
			profValue = 0;
			thisIteration = pad(idCount, 5);
			buildXML += "\t\t\t<id-" + thisIteration + ">\n";
			buildXML += "\t\t\t\t<misc type=\"number\">0</misc>\n";
			if (element.match(/^sleight/)) {
				buildXML += "\t\t\t\t<name type=\"string\">Sleight of Hand</name>\n";
			} else if (element.match(/animal/)) {
				buildXML += "\t\t\t\t<name type=\"string\">Animal Handling</name>\n";
			} else {
				buildXML += "\t\t\t\t<name type=\"string\">" + capitalizeFirstLetter(element) + "</name>\n";
			}
			buildXML += "\t\t\t\t<stat type=\"string\">" + skillsRef[idCount - 1] + "</stat>\n";

			var proficiencies = getObjects(character, 'type', 'proficiency');
			if (proficiencies != null) {
				proficiencies.some(function(prof) {
					var skill = prof.subType.replace(/-/g, '_');
					if (skill == element && (prof.componentId == startingClassID || prof.componentId == backgroundID)) {
						profValue = 1;
					}
				});
			}

			$.each(character.modifiers.feat, function(key42, value42) {
				if (value42.type == "proficiency") {
					//console.log("Feat proficiency: " + value42.subType);
					if (value42.subType == element) {
						profValue = 1;
					}
				}
			});

			$.each(character.modifiers.race, function(key47, value47) {
				if (value47.type == "proficiency") {
					if (value47.subType == element) {
						profValue = 1;
					}
				}
			});

			$.each(character.modifiers.class, function(index, value) {
				if (value.type == 'proficiency' && value.subType == element) {
					profValue = 1;
				}
			});
			$.each(character.modifiers.background, function(index, value) {
				if (value.type == 'proficiency' && value.subType.replace(/-/g, '_') == element) {
					profValue = 1;
				}
			});

			var expertise = getObjects(character, 'type', 'expertise');
			if (expertise != null) {
				expertise.some(function(exp) {
					var expSkill = exp.subType.replace(/-/g, '_');
					if (expSkill == element) {
						profValue = 2;
					}
				});
			}

			if (profValue == 0) {
				if (hasHalf == 1) {
					buildXML += "\t\t\t\t<prof type=\"number\">3</prof>\n";
				} else {
					buildXML += "\t\t\t\t<prof type=\"number\">0</prof>\n";
				}
			} else if (profValue == 1 || profValue == 2) {
				buildXML += "\t\t\t\t<prof type=\"number\">" + profValue + "</prof>\n";
			}

			buildXML += "\t\t\t</id-" + thisIteration + ">\n";
			idCount += 1;
		});
		buildXML += "\t\t</skilllist>\n";

		var charSpecies = character.race.baseName;
		//console.log(charSpecies);
		if (charSpecies == 'Goliath') {
			charSpecies = 'Giant';
		} else if (charSpecies == 'Dragonborn') {
			charSpecies = 'Dragon';
		} else if (charSpecies == 'Tiefling') {
			charSpecies = 'Legacy';
		} else if (charSpecies == 'Elf') {
			charSpecies = 'Lineage';
		}
		//console.log(charSpecies);

		//const re = new RegExp(charSpecies);
		//let speciesTest = charSpecies;
		var finalAncestry = "";
		//var value04 = 'character.options.race';
		var onlyFirst = 0;

		$.each(character.options.race, function(key04, value04) {
			if (onlyFirst == 1) return;
			onlyFirst = 1;
			//console.log(value04.definition.name);
			if (value04.definition.name.search(charSpecies) > 0) {
				var findAncestry = value04.definition.name.replace(/\(/g, "").replace(/\)/g, "").replace(/\-/g, "").split(" ");
				//console.log(findAncestry);
				if (charSpecies == "Lineage") {
					finalAncestry = findAncestry[0];
				} else if (findAncestry.length < 2) {
					// No ancestry
					//console.log("No Ancestry");
				} else if (findAncestry.length == 2) {
					//console.log(findAncestry[0]);
					finalAncestry = findAncestry[0];
				} else if (findAncestry.length == 4) {
					//console.log(findAncestry[2]);
					finalAncestry = findAncestry[2];
				}
			}
		});
		//console.log(finalAncestry);

		if (finalAncestry == "") {
			buildXML += "\t\t<race type=\"string\">" + character.race.fullName + "</race>\n";
		} else {
			buildXML += "\t\t<race type=\"string\">" + finalAncestry + " " + character.race.fullName + "</race>\n";
		}

		buildXML += "\t\t<racelink type=\"windowreference\">\n";
		buildXML += "\t\t\t<class>reference_race</class>\n";
		switch (character.race.baseRaceName.toLowerCase()) {
			case 'dwarf':
				buildXML += "\t\t\t<recordname>race.id-00001@*</recordname>\n";
				break;
			case 'elf':
				buildXML += "\t\t\t<recordname>race.id-00002@*</recordname>\n";
				break;
			case 'human':
				buildXML += "\t\t\t<recordname>race.id-00003@*</recordname>\n";
				break;
			case 'aasimar':
				buildXML += "\t\t\t<recordname>race.id-00004@*</recordname>\n";
				break;
			case 'dragonborn':
				buildXML += "\t\t\t<recordname>race.id-00005@*</recordname>\n";
				break;
			case 'goliath':
				buildXML += "\t\t\t<recordname>race.id-00006@*</recordname>\n";
				break;
			case 'gnome':
				buildXML += "\t\t\t<recordname>race.id-00007@*</recordname>\n";
				break;
			case 'halfling':
				buildXML += "\t\t\t<recordname>race.id-00008@*</recordname>\n";
				break;
			case 'orc':
				buildXML += "\t\t\t<recordname>race.id-00009@*</recordname>\n";
				break;
			case 'tiefling':
				buildXML += "\t\t\t<recordname>race.id-00010@*</recordname>\n";
				break;
			default:
				buildXML += "\t\t\t<recordname>race.id-00005@*</recordname>\n";
		}
		buildXML += "\t\t</racelink>\n";
		// <recordname>race.id-00001@*</recordname> DWARF
		// <recordname>race.id-00002@*</recordname> ELF
		// <recordname>race.id-00003@*</recordname> HUMAN
		// <recordname>race.id-00004@*</recordname> AASIMAR
		// <recordname>race.id-00005@*</recordname> DRAGONBORN
		// <recordname>race.id-00006@*</recordname> GOLIATH
		// <recordname>race.id-00007@*</recordname> GNOME
		// <recordname>race.id-00008@*</recordname> HALFLING
		// <recordname>race.id-00009@*</recordname> ORC
		// <recordname>race.id-00010@*</recordname> TIEFLING

		// <recordname>race_subrace.id-00001@*</recordname> Drow Elf
		// <recordname>race_subrace.id-00002@*</recordname> High Elf
		// <recordname>race_subrace.id-00003@*</recordname> Wood Elf
		// <recordname>race_subrace.id-00004@*</recordname> Cloud Goliath
		// <recordname>race_subrace.id-00005@*</recordname> NOTHING
		// <recordname>race_subrace.id-00006@*</recordname> Forest Gnome
		// <recordname>race_subrace.id-00007@*</recordname> Rock Gnome
		// <recordname>race_subrace.id-00008@*</recordname> Abyssal Tiefling
		// <recordname>race_subrace.id-00009@*</recordname> Chthonic Tiefling
		// <recordname>race_subrace.id-00010@*</recordname> Infernal Tiefling
		// <recordname>race_subrace.id-00011@*</recordname> Black Dragonborn
		// <recordname>race_subrace.id-00012@*</recordname> Blue Dragonborn
		// <recordname>race_subrace.id-00013@*</recordname> Brass Dragonborn
		// <recordname>race_subrace.id-00014@*</recordname> Bronze Dragonborn
		// <recordname>race_subrace.id-00015@*</recordname> Copper Dragonborn
		// <recordname>race_subrace.id-00016@*</recordname> Gold Dragonborn
		// <recordname>race_subrace.id-00017@*</recordname> Green Dragonborn
		// <recordname>race_subrace.id-00018@*</recordname> Red Dragonborn
		// <recordname>race_subrace.id-00019@*</recordname> Silver Dragonborn
		// <recordname>race_subrace.id-00020@*</recordname> White Dragonborn
		// <recordname>race_subrace.id-00021@*</recordname> NOTHING
		// <recordname>race_subrace.id-00022@*</recordname> Fire Goliath
		// <recordname>race_subrace.id-00023@*</recordname> Frost Goliath
		// <recordname>race_subrace.id-00024@*</recordname> Hill Goliath
		// <recordname>race_subrace.id-00025@*</recordname> Stone Goliath
		// <recordname>race_subrace.id-00026@*</recordname> Storm Goliath
		// <recordname>race_subrace.id-00027@*</recordname> NOTHING
		// <recordname>race_subrace.id-00028@*</recordname> NOTHING
		// <recordname>race_subrace.id-00029@*</recordname> NOTHING
		// <recordname>race_subrace.id-00030@*</recordname> NOTHING

		//Species traits:
		//Aasimar:
		//    None
		//Dragonborn:
		//    Black, Blue, Brass, Bronze, Copper, Gold, Green, Red, Silver, White
		//Dwarf:
		//    None
		//Elf:
		//    Drow Lineage, High Elf Lineage, Wood Elf Lineage
		//Gnome:
		//    Forest, Rock
		//Goliath:
		//    Cloud, Fire, Frost, Hill, Stone, Storm
		//Halfling:
		//    None
		//Human:
		//    None
		//Orc:
		//    None
		//Tiefling:
		//    Abyssal, Chthonic, Infernal



		/* * * * * * * * * * * * * * * * * */
		/* Ancestry if exists               */
		/* * * * * * * * * * * * * * * * * */


		if (finalAncestry != "") {
			buildXML += "\t\t<subracelink type=\"windowreference\">\n";
			buildXML += "\t\t\t<class>reference_subrace</class>\n";
			//console.log(finalAncestry);
			switch (finalAncestry) {
				case 'Drow':
					buildXML += "\t\t\t<recordname>race_subrace.id-00001@*</recordname>\n";
					break;
				case 'High':
					buildXML += "\t\t\t<recordname>race_subrace.id-00002@*</recordname>\n";
					break;
				case 'Wood':
					buildXML += "\t\t\t<recordname>race_subrace.id-00003@*</recordname>\n";
					break;
				case 'Cloud':
					buildXML += "\t\t\t<recordname>race_subrace.id-00004@*</recordname>\n";
					break;
				case 'Forest':
					buildXML += "\t\t\t<recordname>race_subrace.id-00006@*</recordname>\n";
					break;
				case 'Rock':
					buildXML += "\t\t\t<recordname>race_subrace.id-00007@*</recordname>\n";
					break;
				case 'Abyssal':
					buildXML += "\t\t\t<recordname>race_subrace.id-00008@*</recordname>\n";
					break;
				case 'Cthonic':
					buildXML += "\t\t\t<recordname>race_subrace.id-00009@*</recordname>\n";
					break;
				case 'Infernal':
					buildXML += "\t\t\t<recordname>race_subrace.id-00010@*</recordname>\n";
					break;
				case 'Black':
					buildXML += "\t\t\t<recordname>race_subrace.id-00011@*</recordname>\n";
					break;
				case 'Blue':
					buildXML += "\t\t\t<recordname>race_subrace.id-00012@*</recordname>\n";
					break;
				case 'Brass':
					buildXML += "\t\t\t<recordname>race_subrace.id-00013@*</recordname>\n";
					break;
				case 'Bronze':
					buildXML += "\t\t\t<recordname>race_subrace.id-00014@*</recordname>\n";
					break;
				case 'Copper':
					buildXML += "\t\t\t<recordname>race_subrace.id-00015@*</recordname>\n";
					break;
				case 'Gold':
					buildXML += "\t\t\t<recordname>race_subrace.id-00016@*</recordname>\n";
					break;
				case 'Green':
					buildXML += "\t\t\t<recordname>race_subrace.id-00017@*</recordname>\n";
					break;
				case 'Red':
					buildXML += "\t\t\t<recordname>race_subrace.id-00018@*</recordname>\n";
					break;
				case 'Silver':
					buildXML += "\t\t\t<recordname>race_subrace.id-00019@*</recordname>\n";
					break;
				case 'White':
					buildXML += "\t\t\t<recordname>race_subrace.id-00020@*</recordname>\n";
					break;
				case 'Fire':
					buildXML += "\t\t\t<recordname>race_subrace.id-00022@*</recordname>\n";
					break;
				case 'Frost':
					buildXML += "\t\t\t<recordname>race_subrace.id-00023@*</recordname>\n";
					break;
				case 'Hill':
					buildXML += "\t\t\t<recordname>race_subrace.id-00024@*</recordname>\n";
					break;
				case 'Stone':
					buildXML += "\t\t\t<recordname>race_subrace.id-00025@*</recordname>\n";
					break;
				case 'Storm':
					buildXML += "\t\t\t<recordname>race_subrace.id-00026@*</recordname>\n";
					break;
				default:
					buildXML += "\t\t\t<recordname>race_subrace.id-00042@*</recordname>\n";
			}

			buildXML += "\t\t</subracelink>\n";
		}


		/* * * * * * * * * * * * * * * * * */
		/* Subrace if exists               */
		/* * * * * * * * * * * * * * * * * */


		// <recordname>class.id-00001@*</recordname> Barbarian
		// <recordname>class.id-00002@*</recordname> Druid
		// <recordname>class.id-00003@*</recordname> Monk
		// <recordname>class.id-00004@*</recordname> Bard
		// <recordname>class.id-00005@*</recordname> Cleric
		// <recordname>class.id-00006@*</recordname> Fighter
		// <recordname>class.id-00007@*</recordname> Paladin
		// <recordname>class.id-00008@*</recordname> Ranger
		// <recordname>class.id-00009@*</recordname> Rogue
		// <recordname>class.id-00010@*</recordname> Sorcerer
		// <recordname>class.id-00011@*</recordname> Warlock
		// <recordname>class.id-00012@*</recordname> Wizard


		// <recordname>background.id-00001@*</recordname> Artisan
		// <recordname>background.id-00002@*</recordname> Acolyte
		// <recordname>background.id-00003@*</recordname> Charlatan
		// <recordname>background.id-00004@*</recordname> Criminal
		// <recordname>background.id-00005@*</recordname> Farmer
		// <recordname>background.id-00006@*</recordname> Entertainer
		// <recordname>background.id-00007@*</recordname> Merchant
		// <recordname>background.id-00008@*</recordname> Guard
		// <recordname>background.id-00009@*</recordname> Guide
		// <recordname>background.id-00010@*</recordname> Hermit
		// <recordname>background.id-00011@*</recordname> Scribe
		// <recordname>background.id-00012@*</recordname> Noble
		// <recordname>background.id-00013@*</recordname> 
		// <recordname>background.id-00014@*</recordname> Sage
		// <recordname>background.id-00015@*</recordname> Sailor
		// <recordname>background.id-00016@*</recordname> Soldier
		// <recordname>background.id-00017@*</recordname> Wayfarer


		//$.each(character.options.race, function(key02, value02){
		//    console.log(value02.definition.name);
		//});

		//$.each(character.classes, function(key03, val03) {
		//    console.log(val03.definition.name + ": " + val03.level);
		//});


		buildXML += "\t\t<classes>\n";

		character.classes.some(function(current_class, i) {
			thisClass = current_class.definition.name.toLowerCase();
			//console.log("Class: " + thisClass);
			if (thisClass == "barbarian") {
				isBarbarian = 1;
				levelBarbarian = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartBarbarian + ((levelBarbarian - 1) * hpBarbarian);
					//sumHP += hpStartBard + ((levelBard - 1) * hpBard);
				} else {
					sumHP += levelBarbarian * hpBarbarian;
				}
				switch (parseInt(levelBarbarian)) {
					case 1:
					case 2:
						barbRages = 2;
						break;
					case 3:
					case 4:
					case 5:
						barbRages = 3;
						break;
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
						barbRages = 4;
						break;
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
						barbRages = 5;
						break;
					case 17:
					case 18:
					case 19:
						barbRages = 6;
						break;
					default:
						barbRages = 0;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					barbPrimalPath = current_class.subclassDefinition.name;
					current_class.subclassDefinition.classFeatures.some(function(findTotem, j) {
						if (levelBarbarian >= findTotem.requiredLevel) {
							if (findTotem.name.match("Totem Spirit")) {
								animalID = findTotem.id;
								character.options.class.some(function(guessing, k) {
									if (animalID == guessing.componentId) {
										barbTotemSpirit = guessing.definition.name;
									}
								});
							} else if (findTotem.name.match("Aspect of the Beast")) {
								animalID = findTotem.id;
								character.options.class.some(function(guessing, k) {
									if (animalID == guessing.componentId) {
										barbBeastAspect = guessing.definition.name;
									}
								});
							} else if (findTotem.name.match("Totemic Attunement")) {
								animalID = findTotem.id;
								character.options.class.some(function(guessing, k) {
									if (animalID == guessing.componentId) {
										barbTotemAttune = guessing.definition.name;
									}
								});
							}
						}
					});
				}
			} else if (thisClass == "bard") {
				isBard = 1;
				levelBard = current_class.level;
				casterLevels += levelBard;
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartBard + ((levelBard - 1) * hpBard);
				} else {
					sumHP += levelBard * hpBard;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					bardCollege = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "cleric") {
				isCleric = 1;
				levelCleric = current_class.level;
				casterLevels += levelCleric;
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartCleric + ((levelCleric - 1) * hpCleric);
				} else {
					sumHP += levelCleric * hpCleric;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					clericDomain = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "druid") {
				isDruid = 1;
				levelDruid = current_class.level;
				casterLevels += levelDruid;
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartDruid + ((levelDruid - 1) * hpDruid);
				} else {
					sumHP += levelDruid * hpDruid;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					druidCircle = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "fighter") {
				isFighter = 1;
				levelFighter = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartFighter + ((levelFighter - 1) * hpFighter);
				} else {
					sumHP += levelFighter * hpFighter;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					fighterArchetype = current_class.subclassDefinition.name;
					if (current_class.subclassDefinition.name == "Eldritch Knight") {
						fighterSubclassEldritchKnight = 1;
						casterLevels += Math.floor(levelFighter / 3);
						casterClasses += 1;
					}
				}
			} else if (thisClass == "monk") {
				isMonk = 1;
				levelMonk = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartMonk + ((levelMonk - 1) * hpMonk);
				} else {
					sumHP += levelMonk * hpMonk;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					monkWay = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "paladin") {
				isPaladin = 1;
				levelPaladin = current_class.level;
				casterLevels += Math.floor(levelPaladin / 2);
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartPaladin + ((levelPaladin - 1) * hpPaladin);
				} else {
					sumHP += levelPaladin * hpPaladin;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					paladinOath = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "ranger") {
				isRanger = 1;
				levelRanger = current_class.level;
				casterLevels += Math.floor(levelRanger / 2);
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartRanger + ((levelRanger - 1) * hpRanger);
				} else {
					sumHP += levelRanger * hpRanger;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					rangerArchtype = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "rogue") {
				isRogue = 1;
				levelRogue = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartRogue + ((levelRogue - 1) * hpRogue);
				} else {
					sumHP += levelRogue * hpRogue;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					rogueArchetype = current_class.subclassDefinition.name;
					//console.log(rogueArchetype);
					if (rogueArchetype == "Arcane Trickster") {
						rogueSubclassArcaneTrickster = 1;
						casterLevels += Math.floor(levelRogue / 3);
						casterClasses += 1;
					} else if (rogueArchetype.match(/Swashbuckler/)) {

					}
				}
			} else if (thisClass == "sorcerer") {
				isSorcerer = 1;
				levelSorcerer = current_class.level;
				casterLevels += levelSorcerer;
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartSorcerer + ((levelSorcerer - 1) * hpSorcerer);
				} else {
					sumHP += levelSorcerer * hpSorcerer;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					sorcererOrigin = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "warlock") {
				isWarlock = 1;
				levelWarlock = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartWarlock + ((levelWarlock - 1) * hpWarlock);
				} else {
					sumHP += levelWarlock * hpWarlock;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					warlockPatron = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "wizard") {
				isWizard = 1;
				levelWizard = current_class.level;
				casterLevels += levelWizard;
				casterClasses += 1;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartWizard + ((levelWizard - 1) * hpWizard);
				} else {
					sumHP += levelWizard * hpWizard;
				}
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					wizardSchool = current_class.subclassDefinition.name;
				}
			} else if (thisClass == "blood hunter" || thisClass == "blood hunter (archived)") {
				isBloodHunter = 1;
				levelBloodHunter = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartBloodhunter + ((levelBloodHunter - 1) * hpBloodHunter);
				} else {
					sumHP += levelBloodHunter * hpBloodHunter;
				}
				//console.log("sumHP: " + sumHP);
			} else if (thisClass == "artificer") {
				isArtificer = 1;
				levelArtificer = current_class.level;
				if (current_class.isStartingClass == true) {
					sumHP += hpStartArtificer + ((levelArtificer - 1) * hpArtificer);
				} else {
					sumHP += levelArtificer * hpArtificer;
				}
			}
			totalClasses += 1;
			totalLevels += current_class.level;
			thisIteration = pad(i + 1, 5);
			buildXML += "\t\t\t<id-" + thisIteration + ">\n";
			buildXML += "\t\t\t\t<hddie type=\"dice\">";
			buildXML += "d" + current_class.definition.hitDice;
			buildXML += "</hddie>\n";
			buildXML += "\t\t\t\t<name type=\"string\">" + current_class.definition.name + "</name>\n";
			if (thisClass === "warlock") {
				buildXML += "\t\t\t\t<casterpactmagic type=\"number\">1</casterpactmagic>\n";
			} else {
				buildXML += "\t\t\t\t<casterpactmagic type=\"number\">0</casterpactmagic>\n";
			}
			if ((thisClass == "bard") || (thisClass == "cleric") || (thisClass == "druid") || (thisClass == "sorcerer") || (thisClass == "warlock") || (thisClass == "wizard") || (thisClass == "artificer")) {
				buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">1</casterlevelinvmult>\n";
			} else if ((thisClass == "paladin" || thisClass == "ranger") && current_class.level >= 2) {
				buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">2</casterlevelinvmult>\n";
			} else if ((thisClass == "rogue" || thisClass == "fighter") && current_class.level >= 3) {
				if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
					if (current_class.subclassDefinition.name == "Arcane Trickster" || current_class.subclassDefinition.name == "Eldritch Knight") {
						buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">3</casterlevelinvmult>\n";
					}
				}
			}
			buildXML += "\t\t\t\t<level type=\"number\">" + current_class.level + "</level>\n";
			buildXML += "\t\t\t\t<shortcut type=\"windowreference\">\n";
			buildXML += "\t\t\t\t\t<class>reference_class</class>\n";
			// Barbarian, Druid, Monk, Bard, Cleric, Fighter, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard
			switch (thisClass) {
				case 'barbarian':
					buildXML += '\t\t\t\t\t<recordname>class.id-00001@*</recordname>\n';
					break;
				case 'druid':
					buildXML += '\t\t\t\t\t<recordname>class.id-00002@*</recordname>\n';
					break;
				case 'monk':
					buildXML += '\t\t\t\t\t<recordname>class.id-00003@*</recordname>\n';
					break;
				case 'bard':
					buildXML += '\t\t\t\t\t<recordname>class.id-00004@*</recordname>\n';
					break;
				case 'cleric':
					buildXML += '\t\t\t\t\t<recordname>class.id-00005@*</recordname>\n';
					break;
				case 'fighter':
					buildXML += '\t\t\t\t\t<recordname>class.id-00006@*</recordname>\n';
					break;
				case 'paladin':
					buildXML += '\t\t\t\t\t<recordname>class.id-00007@*</recordname>\n';
					break;
				case 'ranger':
					buildXML += '\t\t\t\t\t<recordname>class.id-00008@*</recordname>\n';
					break;
				case 'rogue':
					buildXML += '\t\t\t\t\t<recordname>class.id-00009@*</recordname>\n';
					break;
				case 'sorcerer':
					buildXML += '\t\t\t\t\t<recordname>class.id-00010@*</recordname>\n';
					break;
				case 'warlock':
					buildXML += '\t\t\t\t\t<recordname>class.id-00011@*</recordname>\n';
					break;
				case 'wizard':
					buildXML += '\t\t\t\t\t<recordname>class.id-00012@*</recordname>\n';
					break;
				default:
			}
			buildXML += "\t\t\t\t</shortcut>\n";
			buildXML += "\t\t\t</id-" + thisIteration + ">\n";

		});
		buildXML += "\t\t</classes>\n";

		// 1 = Fixed, 2 = Manual
		if (character.preferences.hitPointType == "2") {
			totalHP = character.baseHitPoints + ((Math.floor((getTotalAbilityScore(character, 3) - 10) / 2) * totalLevels));
		} else {
			totalHP = addHP + sumHP + Math.floor((getTotalAbilityScore(character, 3) - 10) / 2) * totalLevels;
		}

		if (isTough == 1) {
			totalHP += 2;
		}

		buildXML += "\t\t<hp>\n";
		if (character.deathSaves.failCount != null) {
			buildXML += "\t\t\t<deathsavefail type=\"number\">" + character.deathSaves.failCount + "</deathsavefail>\n";
		} else {
			buildXML += "\t\t\t<deathsavefail type=\"number\">0</deathsavefail>\n";
		}
		if (character.deathSaves.successCount != null) {
			buildXML += "\t\t\t<deathsavesuccess type=\"number\">" + character.deathSaves.successCount + "</deathsavesuccess>\n";
		} else {
			buildXML += "\t\t\t<deathsavesuccess type=\"number\">0</deathsavesuccess>\n";
		}
		buildXML += "\t\t\t<total type=\"number\">" + totalHP + "</total>\n";
		buildXML += "\t\t</hp>\n";

		var background = '';
		if (character.background.definition != null) {
			background = character.background.definition.name;
		}

		if (background == '' && character.background.customBackground.name != null) {
			background = character.background.customBackground.name;
		}

		buildXML += "\t\t<background type=\"string\">" + background + "</background>\n";
		buildXML += "\t\t<backgroundlink type=\"windowreference\">\n";
		buildXML += "\t\t\t<class>reference_background</class>\n";
		if (background.match(/Artisan\s\/\sGuild/)) {
			background = "guildartisan";
		} else if (background.match(/House\sAgent/)) {
			background = "houseagent";
		} else if (background.match(/Criminal\s\/\sSpy/)) {
			background = "spy";
		}

		// Artisan, Acolyte, Charlatan, Criminal, Farmer, Entertainer, Merchant, Guard, Guide, Hermit, Scribe, Noble, EMPTY, Sage, Sailor, Soldier, Wayfarer
		switch (background.toLowerCase()) {
			case 'artisan':
				buildXML += '\t\t\t<recordname>background.id-0001@*</recordname>\n';
				break;
			case 'acolyte':
				buildXML += '\t\t\t<recordname>background.id-00002@*</recordname>\n';
				break;
			case 'charlatan':
				buildXML += '\t\t\t<recordname>background.id-00003@*</recordname>\n';
				break;
			case 'criminal':
				buildXML += '\t\t\t<recordname>background.id-00004@*</recordname>\n';
				break;
			case 'farmer':
				buildXML += '\t\t\t<recordname>background.id-00005@*</recordname>\n';
				break;
			case 'entertainer':
				buildXML += '\t\t\t<recordname>background.id-00006@*</recordname>\n';
				break;
			case 'merchant':
				buildXML += '\t\t\t<recordname>background.id-00007@*</recordname>\n';
				break;
			case 'guard':
				buildXML += '\t\t\t<recordname>background.id-00008@*</recordname>\n';
				break;
			case 'guide':
				buildXML += '\t\t\t<recordname>background.id-00009@*</recordname>\n';
				break;
			case 'hermit':
				buildXML += '\t\t\t<recordname>background.id-00010@*</recordname>\n';
				break;
			case 'scribe':
				buildXML += '\t\t\t<recordname>background.id-00011@*</recordname>\n';
				break;
			case 'noble':
				buildXML += '\t\t\t<recordname>background.id-00012@*</recordname>\n';
				break;
			case 'sage':
				buildXML += '\t\t\t<recordname>background.id-00014@*</recordname>\n';
				break;
			case 'sailor':
				buildXML += '\t\t\t<recordname>background.id-00015@*</recordname>\n';
				break;
			case 'soldier':
				buildXML += '\t\t\t<recordname>background.id-00016@*</recordname>\n';
				break;
			case 'wayfarer':
				buildXML += '\t\t\t<recordname>background.id-00017@*</recordname>\n';
				break;
			default:
				buildXML += '\t\t\t<recordname>background.id-00013@*</recordname>\n';
		}
		buildXML += "\t\t</backgroundlink>\n";

		// Character Inventory
		var weaponList = [];
		var weaponID = [];
		var weaponName = [];
		var weaponProperties = [];
		var weaponDice = [];
		var weaponDiceMult = [];
		var weaponType = [];
		var weaponBonus = [];
		var weaponBase = [];

		buildXML += "\t\t<inventorylist>\n";
		const inventory = character.inventory;

		const map1 = new Map();

		if (inventory != null) inventory.some(function(container, i) {
			if (container.definition.isContainer == true) {
				//console.log(item.definition.name);
				map1.set(container.id, container.definition.name);
			}
		});

		if (inventory != null) inventory.some(function(item, i) {
			//console.log("ID: " + item.id + "; Name: " + item.definition.name);
			//
			if (item.definition.name == "Crossbow Bolts") {
				numBolts += parseInt(item.quantity);
			} else if (item.definition.name == "Arrows") {
				numArrows += parseInt(item.quantity);
			} else if (item.definition.name == "Blowgun Needles") {
				numNeedles += parseInt(item.quantity);
			} else if (item.definition.name == "Sling Bullets") {
				numBullets += parseInt(item.quantity);
			}

			thisIteration = pad(i + 1, 5);

			buildXML += "\t\t\t<id-" + thisIteration + ">\n";
			buildXML += "\t\t\t\t<count type=\"number\">" + parseInt(item.quantity) + "</count>\n";
			buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(item.definition.name) + "</name>\n";
			buildXML += "\t\t\t\t<weight type=\"number\">" + parseInt(item.definition.weight) / parseInt(item.definition.bundleSize) + "</weight>\n";
			buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
			buildXML += "\t\t\t\t<isidentified type=\"number\">1</isidentified>\n";

			// Somewhere around here we should put location
			//buildXML += "\t\t\t\t<location type=\"string\">1</isidentified>\n";
			// Does item.definition.containerEntityId equal something in the hash table.
			// If it does, then the location field should be set to the value of the key
			//console.log(myMap.has(0));
			//if (map1.has(item.containerEntityId)) {
			//    console.log("I'm in something");
			//    // This appears to work, so now we can set the location
			//    buildXML += "\t\t\t\t<location type=\"string\">" +  + "</isidentified>\n"
			//}
			//console.log(item.)
			map1.forEach((values, keys) => {
				if (keys == item.containerEntityId) {
					buildXML += "\t\t\t\t<location type=\"string\">" + values + "</location>\n";
					//console.log("\t\t\t\t<location type=\"string\">" + values + "</isidentified>\n");
				}
				//console.log(values,keys)
			});

			if (item.definition.subType == null) {
				buildXML += "\t\t\t\t<type type=\"string\">" + fixQuote(item.definition.filterType) + "</type>\n";
				if (item.definition.filterType == "Armor") {
					if (item.definition.type != null || item.definition.type != "") {
						buildXML += "\t\t\t\t<subtype type=\"string\">" + fixQuote(item.definition.type) + "</subtype>\n";
						buildXML += "\t\t\t\t<ac type=\"number\">" + item.definition.armorClass + "</ac>\n";
					}
					if (item.definition.stealthCheck != null) {
						if (item.definition.stealthCheck == 2) {
							buildXML += "\t\t\t\t<stealth type=\"string\">Disadvantage</stealth>\n";
						} else {
							buildXML += "\t\t\t\t<stealth type=\"string\">-</stealth>\n";
						}
					}
					if (item.definition.strengthRequirement != null) {
						buildXML += "\t\t\t\t<strength type=\"string\">Str " + item.definition.strengthRequirement + "</strength>\n";
					} else {
						buildXML += "\t\t\t\t<strength type=\"string\">-</strength>\n";
					}
				}
			} else {
				buildXML += "\t\t\t\t<type type=\"string\">" + fixQuote(item.definition.subType) + "</type>\n";
			}
			if (item.definition.cost == null) {
				buildXML += "\t\t\t\t<cost type=\"string\"></cost>\n";
			} else {
				buildXML += "\t\t\t\t<cost type=\"string\">" + item.definition.cost + " gp" + "</cost>\n";
			}

			if (item.definition.canAttune == true) {
				buildXML += "\t\t\t\t<rarity type=\"string\">" + item.definition.rarity + " (Requires Attunement)</rarity>\n";
			} else {
				buildXML += "\t\t\t\t<rarity type=\"string\">" + item.definition.rarity + "</rarity>\n";
			}
			if (item.equipped == true) {
				buildXML += "\t\t\t\t<carried type=\"number\">2</carried>\n";
				if (item.definition.filterType == "Armor") {
					if (item.definition.type == "Shield") {
						usingShield = 1;
					} else if (item.definition.type.match("Armor")) {
						wearingArmor = 1;
						if (item.definition.type.match("Heavy")) {
							usingHeavyArmor = 1;
						} else if (item.definition.type.match("Medium")) {
							usingMediumArmor = 1;
						} else if (item.definition.type.match("Light")) {
							usingLightArmor = 1;
						}
					}
				}
			} else {
				buildXML += "\t\t\t\t<carried type=\"number\">1</carried>\n";
			}

			//if(item.definition.hasOwnProperty("damage")) {
			if (item.definition.damage != null) {
				thisDamage = "";
				thisDamType = "";

				if (item.definition.damage != null) {
					thisDamage = item.definition.damage.diceString;
				}

				if (item.definition.damageType != null) {
					thisDamType = item.definition.damageType;
				}

				buildXML += "\t\t\t\t<damage type=\"string\">" + thisDamage + " " + thisDamType + "</damage>\n";
				//console.log(buildXML);
				thisProperties = "";
				item.definition.properties.some(function(weapProp, i) {
					if (weapProp.name == "Ammunition") {
						thisProperties += "Ammunition (" + item.definition.range + "/" + item.definition.longRange + "), ";
					} else if (weapProp.name == "Thrown") {
						thisProperties += "Thrown (" + item.definition.range + "/" + item.definition.longRange + "), ";
					} else {
						thisProperties += weapProp.name + ", ";
					}
				});
				thisProperties = thisProperties.trim().slice(0, -1);
				buildXML += "\t\t\t\t<properties type=\"string\">" + thisProperties + "</properties>\n";

				// Get bonus for weapon, but this is only for Inventory, need to fix attacks
				for (d = 0; d <= item.definition.grantedModifiers.length - 1; d++) {
					if (item.definition.grantedModifiers[d].type == "bonus" && item.equipped == true) {
						if (item.isAttuned == true && item.definition.canAttune == true) {
							buildXML += "\t\t\t\t<bonus type=\"number\">" + item.definition.grantedModifiers[0].value + "</bonus>\n";
						} else if (item.definition.canAttune == false) {
							buildXML += "\t\t\t\t<bonus type=\"number\">" + item.definition.grantedModifiers[0].value + "</bonus>\n";
						}
					}
				}

				weaponID.push(i + 1);
				weaponName.push(item.definition.name);
				weaponProperties.push(thisProperties);
				//console.log(item.definition.name);
				//console.log(thisProperties);
				if (thisProperties.includes("Finesse")) {
					if (strScore >= dexScore) {
						weaponBase.push("strength");
					} else {
						weaponBase.push("dexterity");
					}
				} else if (thisProperties.includes("Range")) {
					//console.log(item.definition.name);
					weaponBase.push("dexterity");
				} else {
					weaponBase.push("base");
				}

				curWeapBon = 0;

				if (item.hasOwnProperty("canAttune")) {
					if (item.isAttuned == true && item.definition.canAttune == true) {
						for (d = 0; d <= item.definition.grantedModifiers.length - 1; d++) {
							curWeapBon = item.definition.grantedModifiers[d].value;
						}
					}
				} else {
					for (e = 0; e <= item.definition.grantedModifiers.length - 1; e++) {
						curWeapBon = item.definition.grantedModifiers[e].value;
					}
				}
				weaponBonus.push(curWeapBon);

				if (item.definition.damage != null) {
					weaponDice.push(item.definition.damage.diceCount + "d" + item.definition.damage.diceValue);
				} else {
					weaponDice.push("d0");
				}
				if (item.definition.damageType != null) {
					weaponType.push(item.definition.damageType.toLowerCase());
				} else {
					weaponType.push("");
				}
			}

			if (item.definition.hasOwnProperty("weaponBehaviors")) {
				if (item.definition.weaponBehaviors.length > 0) {
					thisDamage = "";
					thisDamType = "";
					if (item.definition.weaponBehaviors[0].damage != null) {
						thisDamage = item.definition.weaponBehaviors[0].damage.diceString;
					}

					if (item.definition.weaponBehaviors[0].damageType != null) {
						thisDamType = item.definition.weaponBehaviors[0].damageType;
					}

					buildXML += "\t\t\t\t<damage type=\"string\">" + thisDamage + " " + thisDamType + "</damage>\n";
					thisProperties = "";
					item.definition.weaponBehaviors[0].properties.some(function(weapProp) {
						if (weapProp.name == "Ammunition") {
							thisProperties += "Ammunition (" + item.definition.range + "/" + item.definition.longRange + "), ";
						} else {
							if (weapProp.hasOwnProperty("notes")) {
								if (weapProp.notes != "" && weapProp.notes != undefined && weapProp != null) {
									thisProperties += weapProp.name + "(" + weapProp.notes + "), ";
								} else {
									thisProperties += weapProp.name + ", ";
								}
							}
						}
					});
					thisProperties = thisProperties.trim().slice(0, -1);
					buildXML += "\t\t\t\t<properties type=\"string\">" + thisProperties + "</properties>\n";

					weaponID.push(i + 1);
					weaponName.push(item.definition.name);
					weaponProperties.push(thisProperties);
					if (item.definition.weaponBehaviors[0].damage != null) {
						weaponDice.push("d" + item.definition.weaponBehaviors[0].damage.diceValue);
						weaponDiceMult.push(item.definition.weaponBehaviors[0].damage.diceCount);
					} else {
						weaponDice.push("d0");
						weaponDiceMult.push("0");
					}
					if (item.definition.weaponBehaviors[0].damageType != null) {
						weaponType.push(item.definition.weaponBehaviors[0].damageType.toLowerCase());
					} else {
						weaponType.push("");
					}
					item.definition.grantedModifiers.some(function(doMods) {
						if (doMods.type == "bonus") {
							weaponBonus.push(doMods.value);
							buildXML += "\t\t\t\t<bonus type=\"number\">" + doMods.value + "</bonus>\n";
						}
					});
				} else {
					// This item has weapon properties, but the length is 0
					if (item.definition.hasOwnProperty("grantedModifiers")) {
						if (item.definition.grantedModifiers.length > 0) {
							for (l = 0; l <= item.definition.grantedModifiers.length - 1; l++) {
								if (item.definition.grantedModifiers[l].subType == "armor-class" && item.equipped == true && item.definition.grantedModifiers[l].type == "bonus") {
									addBonusOtherAC += item.definition.grantedModifiers[l].value;
								}
								if (item.definition.grantedModifiers[l].subType == "saving-throws" && item.equipped == true && item.definition.grantedModifiers[l].type == "bonus") {
									addSavingThrows += item.definition.grantedModifiers[l].value;
								}
							}
						}
					}
				}
			} else {
				// Item does not have weaponBehaviors
				if (item.definition.hasOwnProperty("grantedModifiers")) {
					for (m = 0; m <= item.definition.grantedModifiers.length - 1; m++) {
						if (item.definition.grantedModifiers[m].subType == "armor-class" && item.equipped == true && item.definition.grantedModifiers[m].type == "bonus") {
							addBonusArmorAC += item.definition.grantedModifiers[m].value;
						}
						if (item.definition.grantedModifiers[m].subType == "saving-throws" && item.equipped == true && item.definition.grantedModifiers[m].type == "bonus") {
							addSavingThrows += item.definition.grantedModifiers[m].value;
						}
					}
				}
			}

			buildXML += "\t\t\t\t<description type=\"formattedtext\">\n";
			buildXML += "\t\t\t\t\t" + fixDesc(item.definition.description) + "\n";
			buildXML += "\t\t\t\t</description>\n";
			thisWeaponName = item.definition.name.toLowerCase().replace(/\s/g, "_").replace(/,/g, "");
			if (simpleRangedWeapon.indexOf(thisWeaponName) != -1) {
				buildXML += "\t\t\t\t<subtype type=\"string\">Simple Ranged Weapon</subtype>\n";
			} else if (simpleMeleeWeapon.indexOf(thisWeaponName) != -1) {
				buildXML += "\t\t\t\t<subtype type=\"string\">Simple Melee Weapon</subtype>\n";
			} else if (martialRangedWeapon.indexOf(thisWeaponName) != -1) {
				buildXML += "\t\t\t\t<subtype type=\"string\">Martial Ranged Weapon</subtype>\n";
			} else if (martialMeleeWeapon.indexOf(thisWeaponName) != -1) {
				buildXML += "\t\t\t\t<subtype type=\"string\">Martial Melee Weapon</subtype>\n";
			}
			buildXML += "\t\t\t</id-" + thisIteration + ">\n";

			// Let's find out about isContainer. We need to capture these, and it should probably parse all inventory to find these first
			//if (item.definition.isContainer == true) {
			//    console.log(item.definition.name);
			//}

		});
		buildXML += "\t\t</inventorylist>\n";

		var languages = getObjects(character, 'type', 'language');
    	buildXML += "\t\t<languagelist>\n";
    	languages.some(function(current_lang, i) {
        	if (current_lang.subType != 'select-a-standard-language') {
            	thisIteration = pad(i + 1, 5);
            	buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            	buildXML += "\t\t\t\t<name type=\"string\">" + capitalizeFirstLetter(current_lang.subType) + "</name>\n";
            	buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        	}
    	});
    	buildXML += "\t\t</languagelist>\n";

		character.race.racialTraits.some(function(current_trait) {
			if(current_trait.definition.name == "Darkvision") {
				buildXML += "\t\t<senses type=\"string\">Darkvision 60ft.</senses>\n";
			} else if(current_trait.definition.name == "Superior Darkvision") {
				buildXML += "\t\t<senses type=\"string\">Darkvision 120ft.</senses>\n";
			}
		});
	
		buildXML += "\t\t<traitlist>\n";
		character.race.racialTraits.some(function(current_trait, i) {
			switch (current_trait.definition.name) {
				case "Ability Score Increase": case "Age": case "Alignment": case "Size": case "Speed": case "Darkvision":
				case "Dwarven Combat Training": case "Tool Proficiency": case "Languages": case "Dwarven Toughness":
				case "Cantrip": case "Extra Language": case "Dwarven Armor Training": case "Skill Versatility":
				case "Ability Score Increases": case "Creature Type": 
					return;
				default:
					break;
			}
			thisIteration = pad(i + 1, 5);
			buildXML += "\t\t\t<id-" + thisIteration + ">\n";
	
			// Drag/drop only lists name, not any snippet, so we've removed it.
			buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_trait.definition.name).trim() + "</name>\n";
			buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(character.race.baseName.toLowerCase())) + "</source>\n";
			buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
			buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
			buildXML += "\t\t\t\t\t" + fixDesc(current_trait.definition.description) + "\n";
			buildXML += "\t\t\t\t</text>\n";
			buildXML += "\t\t\t\t<type type=\"string\">racial</type>\n";
			buildXML += "\t\t\t</id-" + thisIteration + ">\n";
		});
	
		buildXML += "\t\t</traitlist>\n";
	
		totalFeatures = 0;
		totalFeats = 0;
		buildXML += "\t\t<featurelist>\n";
		character.classes.some(function(current_class) {
			classLevel = current_class.level;
			current_class.definition.classFeatures.some(function(current_feature) {
	
	
				switch (current_feature.name) {
					case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
					case "Ability Score Improvement": case "Oath Spells": case "Spellcasting":
					case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
					case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
					case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
					case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
					case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
					case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
						return;
					default:
						break;
				}
				if(parseInt(current_feature.requiredLevel) <= parseInt(classLevel)) {
					if(!holdFeatures.includes(current_feature.name)) {
						holdFeatures.push(current_feature.name);
						totalFeatures += 1;
						thisIteration = pad(totalFeatures, 5);
						buildXML += "\t\t\t<id-" + thisIteration + ">\n";
						buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
						buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_feature.name) + "</name>\n";
						buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(current_class.definition.name.toLowerCase())) + "</source>\n";
						buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
						buildXML += "\t\t\t\t\t" + fixDesc(current_feature.description) + "\n";
						buildXML += "\t\t\t\t</text>\n";
						buildXML += "\t\t\t</id-" + thisIteration + ">\n";
					}
				}
			});
			if(current_class.hasOwnProperty("subclassDefinition")) {
				if(current_class.subclassDefinition != null) {
	
					if(holdFeatures.includes(current_class.subclassDefinition.name)) {
						// Skip this one, it's already in the array
					} else {
						holdFeatures.push(current_class.subclassDefinition.name);
						totalFeatures += 1;
						thisIteration = pad(totalFeatures, 5);
						buildXML += "\t\t\t<id-" + thisIteration + ">\n";
						buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
						buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_class.subclassDefinition.name) + "</name>\n";
						buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
						buildXML += "\t\t\t\t\t" + fixDesc(current_class.subclassDefinition.description) + "\n";
						buildXML += "\t\t\t\t</text>\n";
						buildXML += "\t\t\t</id-" + thisIteration + ">\n";
					}
					current_class.subclassDefinition.classFeatures.some(function(charSubClass) {
						switch (charSubClass.name) {
							case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
							case "Ability Score Improvement": case "Oath Spells":
							case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
							case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
							case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
							case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
							case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
							case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
								return;
							default:
								break;
						}
						if(charSubClass.requiredLevel <= parseInt(classLevel)) {
							if(holdFeatures.includes(charSubClass.name)) {
								// Skip this one, it's already in the array
							} else {
								holdFeatures.push(charSubClass.name);
								totalFeatures += 1;
								thisIteration = pad(totalFeatures, 5);
								buildXML += "\t\t\t<id-" + thisIteration + ">\n";
								buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
								buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(charSubClass.name) + "</name>\n";
								buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
								buildXML += "\t\t\t\t\t" + fixDesc(charSubClass.description) + "\n";
								buildXML += "\t\t\t\t</text>\n";
								buildXML += "\t\t\t</id-" + thisIteration + ">\n";
							}
						}
					});
				}
			}
	
		});
		const charOptions = character.options.class;
		if (charOptions != null) charOptions.some(function(thisOption) {
			switch (thisOption.definition.name) {
				case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
				case "Ability Score Improvement": case "Oath Spells":
				case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
				case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
				case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
				case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
				case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
				case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
					return;
				default:
					break;
			}
			totalFeatures += 1;
			thisIteration = pad(totalFeatures, 5);
			buildXML += "\t\t\t<id-" + thisIteration + ">\n";
			buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
			buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(thisOption.definition.name) + "</name>\n";
			buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
			buildXML += "\t\t\t\t\t" + fixDesc(thisOption.definition.description) + "\n";
			buildXML += "\t\t\t\t</text>\n";
			buildXML += "\t\t\t</id-" + thisIteration + ">\n";
		});
		buildXML += "\t\t</featurelist>\n";

		//buildXML += "\t\t<featlist>\n";
//
		//if (character.background.definition != null) {
		//	if (character.background.definition.featureName != null || (character.background.definition.featureName != "")) {
		//		totalFeats += 1;
		//		thisIteration = pad(totalFeats + 1, 5);
		//		buildXML += "\t\t\t<id-" + thisIteration + ">\n";
		//		buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(character.background.definition.featureName).trim() + "</name>\n";
		//		buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(character.background.definition.name.toLowerCase())) + "</source>\n";
		//		buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
		//		buildXML += "\t\t\t\t\t" + fixDesc(character.background.definition.featureDescription) + "\n";
		//		buildXML += "\t\t\t\t</text>\n";
		//		buildXML += "\t\t\t\t<type type=\"string\">background</type>\n";
		//		buildXML += "\t\t\t</id-" + thisIteration + ">\n";
		//	}
		//}
		buildXML += "\t\t<featlist>\n";


		//"grantedFeats": [
        //  {
        //    "id": 16315,
        //    "name": "Tough",
        //    "featIds": [
        //      1789206
        //    ]
        //  },

		

		$.each(character.background.definition.grantedFeats, function(key32, val32) {
			//console.log("ID: " + val32.id + "; Name: " + val32.name + "\n");
			featValue = 0;
			//if (val32.name == "Tough") {
			//	isTough = 1;
			//}
			if (val32.name != "Ability Scores") {
				//console.log("ID: " + val32.id + "; Name: " + val32.name + "\n");
				// Skip grantedFeats of Ability Scores
				var thisFeat2 = val32.featIds;
				$.each(character.feats, function(key001, val001) {
					if (val001.definition.id == thisFeat2[0]) {
						// Description = val.definition.description
						featValue += 1;
						thisIteration = pad(featValue, 5);
						buildXML += "\t\t\t<id-" + thisIteration + ">\n";
						buildXML += "\t\t\t<effectlist />\n";
						buildXML += "\t\t\t<name type=\"string\">" + val32.name + "</name>\n";
						buildXML += "\t\t\t<text type=\"formattedtext\">\n";
						buildXML += "\t\t\t\t<p>" + val001.definition.description + "</p>\n";
						buildXML += "\t\t\t</text>\n";
						buildXML += "\t\t\t<version type=\"string\">2024</version>\n";
						buildXML += "\t\t\t</id-" + thisIteration + ">\n";
					}
				});
			}
		});
		buildXML += "\t\t</featlist>\n";

		//$.each(character.feats, function(key001, val001) {
		//	if (val.componentId == <feat ID>
		//		// Description = val.definition.description
		//});

		character.race.racialTraits.some(function(fleet_trait, i) {
			if(fleet_trait.definition.name == "Fleet of Foot" || fleet_trait.definition.name == "Swift") {
				addSpeed += 5;
			}
		});
		charWalk = parseInt(character.race.weightSpeeds.normal.walk) + addSpeed;
		buildXML += "\t\t<speed>\n";
    	buildXML += "\t\t\t<base type=\"number\">" + parseInt(charWalk) + "</base>\n";
    	buildXML += "\t\t\t<total type=\"number\">" + parseInt(charWalk) + "</total>\n";
    	buildXML += "\t\t</speed>\n";

		if (isHuman == 1) {
			buildXML += "\t\t<inspiration type=\"number\">1</inspiration>\n";
		}

		baseAC = 0;
    shieldYes = 0;
    shieldAC = 0;
    armDis = 0;
    armShieldProf = 0;
    character.inventory.some(function(eachInventory, i) {
        if(eachInventory.definition.filterType == "Armor") {
            if(eachInventory.equipped == true) {
                baseAC += eachInventory.definition.armorClass;
                if(eachInventory.definition.type == "Shield") {
                    shieldYes = 1;
                    shieldAC = eachInventory.definition.armorClass;
                    baseAC -= shieldAC;
                    if(holdProf.includes("Shields")) {
                        // Shield is proficient
                    } else {
                        armShieldProf -= 1;
                    }
                } else {
                    if(eachInventory.definition.stealthCheck == 2) {
                        armDis = 1;
                    }
                    thisArmor = eachInventory.definition.name.toLowerCase().replace(/\s/g, "_").replace(/-/g, "_");
                    if(noDexArmor.includes(thisArmor)) {
                        dexBonus = 0;
                        if(!holdProf.includes("Heavy Armor")) {
                            armShieldProf -= 1;
                        }
                    } else if(max2DexArmor.includes(thisArmor)) {
                        if(dexBonus > 2) {
                            dexBonus = 2;
                        }
                        if(!holdProf.includes("Medium Armor")) {
                            armShieldProf -= 1;
                        }
                    } else if(max3DexArmor.includes(thisArmor)) {
                        if(dexBonus > 3) {
                            dexBonus = 3;
                        }
                    } else if(fullDexArmor.includes(thisArmor)) {
                        if(dexBonus > 4) {
                            dexBonus = 4;
                        }
                        if(!holdProf.includes("Light Armor")) {
                            armShieldProf -= 1;
                        }
                    }
                }
            }
        }
    });


		buildXML += "\t\t<defenses>\n";
		buildXML += "\t\t\t<ac>\n";
		if(baseAC == 0) {
			baseAC += 10;
		}
		buildXML += "\t\t\t\t<armor type=\"number\">" + (baseAC - 10) + "</armor>\n";
		if (mamFeat == 1) {
			dexBonus = 3;
		}
		var npcDexBonus = dexBonus;
		switch(dexBonus) {
			case 0:
				buildXML += "\t\t\t\t<dexbonus type=\"string\">no</dexbonus>\n";
				npcDexBonus = 0;
				break;
			case 2:
				buildXML += "\t\t\t\t<dexbonus type=\"string\">max2</dexbonus>\n";
				if (npcDexBonus >= 2) {
					npcDexBonus = 2;
				}
				break;
			case 3:
				buildXML += "\t\t\t\t<dexbonus type=\"string\">max3</dexbonus>\n";
				if (npcDexBonus >= 3) {
					npcDexBonus = 3;
				}
				break;
		}
		if(isSorcerer == 1 && wearingArmor == 0 && usingShield == 0) {
			buildXML += "\t\t\t\t<misc type=\"number\">" + (3 + addBonusOtherAC) + "</misc>\n";
			npcDexBonus += 3 + addBonusOtherAC;
		} else {
			buildXML += "\t\t\t\t<misc type=\"number\">" + (addBonusArmorAC + addBonusOtherAC) + "</misc>\n";
			npcDexBonus += addBonusArmorAC + addBonusOtherAC;
		}
		if(armDis == 1 && mamFeat == 0) {
			buildXML += "\t\t\t\t<disstealth type=\"number\">1</disstealth>\n";
		}
		if(isMonk == 1 && wearingArmor == 0 && usingShield == 0) {
			buildXML += "\t\t\t\t<stat2 type=\"string\">wisdom</stat2>\n";
		}
		if(isBarbarian == 1 && wearingArmor == 0) {
			buildXML += "\t\t\t\t<stat2 type=\"string\">constitution</stat2>\n";
		}
		if(armShieldProf < 0) {
			buildXML += "\t\t\t\t<prof type=\"number\">0</prof>\n";
		} else {
			buildXML += "\t\t\t\t<prof type=\"number\">1</prof>\n";
		}
		if(shieldYes == 1) {
			buildXML += "\t\t\t\t<shield type=\"number\">" + shieldAC + "</shield>\n";
			npcDexBonus += 1;
		}
	
		buildXML += "\t\t\t\t<temporary type=\"number\">0</temporary>\n";
		buildXML += "\t\t\t</ac>\n";
	
		// Start Insert special defenses here
		buildXML += "\t\t\t<special type=\"string\">" + specialDefense + "</special>\n";
		// End Insert special defenses here
		buildXML += "\t\t</defenses>\n";

		totalProfs = 0;
    buildXML += "\t\t<proficiencylist>\n";
    var proficiencies = getObjects(character, 'type', 'proficiency');
    if(proficiencies != null) proficiencies.some(function(prof, i) {
        if (typeof prof.friendlySubtypeName == 'undefined') {
            //    console.log("Has friendly");
            //} else {
            //    console.log("Yup, found something here");
            //}
            //if(holdProf.includes(prof.friendlySubtypeName) || (prof.friendlySubtypeName).match(/Saving Throws/)) {
            //  FIXME: What is this?
            //  console.log("We got here");
            //}
        } else {
            if ((prof.friendlySubtypeName).match(/Saving\sThrows/) || holdProf.includes(prof.friendlySubtypeName)) {
                // Skip Saving Throws in proficiencies
            } else {
                switch (prof.friendlySubtypeName) {
                    case "Athletics": case "Acrobatics": case "Sleight of Hand": case "Stealth": case "Arcana": case "History": case "Investigation": case "Nature": case "Religion": case "Animal Handling": case "Insight": case "Medicine": case "Perception": case "Survival": case "Deception": case "Intimidation": case "Performance": case "Persuasion":
                        return;
                    default:
                        holdProf.push(prof.friendlySubtypeName);
                        thisIteration = pad(i + 1, 5);
                        totalProfs += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(prof.friendlySubtypeName) + "</name>\n";
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                }
            }
        }
    });
	buildXML += "\t\t</proficiencylist>\n";

	buildXML += "\t\t<exp type=\"number\">" + character.currentXp + "</exp>\n";
    if(character.age != null) buildXML += "\t\t<age type=\"string\">" + character.age + "</age>\n";
    buildXML += "\t\t<height type=\"string\">" + fixQuote(character.height) + "</height>\n";
    if(character.weight != null) buildXML += "\t\t<weight type=\"string\">" + character.weight + "</weight>\n";
    buildXML += "\t\t<gender type=\"string\">" + fixQuote(character.gender) + "</gender>\n";
    
	$.each(character.modifiers.race, function(keySize, valSize) {
		if (valSize.type == "size") {
			buildXML += "\t\t<size type=\"string\">" + valSize.subType + "</size>\n";
		}
	});
    buildXML += "\t\t<deity type=\"string\">" + fixQuote(character.faith) + "</deity>\n";

    if (character.eyes != null) {
        hasAppear += 1;
    }
    if (character.hair != null) {
        hasAppear += 2;
    }
    if (character.skin != null) {
        hasAppear += 4;
    }

    if (hasAppear == 1) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "</appearance>\n";
    } else if (hasAppear == 2) {
        buildXML += "\t\t<appearance type=\"string\">Hair: " + fixQuote(character.hair) + "</appearance>\n";
    } else if (hasAppear == 3) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nHair: " + fixQuote(character.hair) + "</appearance>\n";
    } else if (hasAppear == 4) {
        buildXML += "\t\t<appearance type=\"string\">Skin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 5) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 6) {
        buildXML += "\t\t<appearance type=\"string\">Hair: " + fixQuote(character.hair) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 7) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nHair: " + fixQuote(character.hair) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    }

	var charAlign = "";
    switch(character.alignmentId) {
        case 1:
            charAlign = "Lawful Good";
            break;
        case 2:
            charAlign = "Neutral Good";
            break;
        case 3:
            charAlign = "Chaotic Good";
            break;
        case 4:
            charAlign = "Lawful Neutral";
            break;
        case 5:
            charAlign = "Neutral";
            break;
        case 6:
            charAlign = "Chaotic Neutral";
            break;
        case 7:
            charAlign = "Lawful Evil";
            break;
        case 8:
            charAlign = "Neutral Evil";
            break;
        case 9:
            charAlign = "Chaotic Evil";
            break;
        default:
            charAlign = "None Selected";
    }

    buildXML += "\t\t<alignment type=\"string\">" + charAlign + "</alignment>\n";

	// Initiative
    var initMod = dexMod;
	buildXML += "\t\t<initiative>\n";
	if (isAlert == 1) initMod = 2;
    buildXML += "\t\t\t<misc type=\"number\">" + initMod + "</misc>\n";
	buildXML += "\t\t\t<total type=\"number\">" + dexMod + initMod + "</total>\n";
    buildXML += "\t\t</initiative>\n";

		if (charType == "pc") {
			allXML += buildXML + endXML;
		} else {
			allXML += npcXML + endXML;
		}
		$('#textHere').val(allXML);
	}
}

const getTotalAbilityScore = function(character, scoreId) {
	var index = scoreId - 1;
	var base = (character.stats[index].value == null ? 10 : character.stats[index].value),
		bonus = (character.bonusStats[index].value == null ? 0 : character.bonusStats[index].value),
		override = (character.overrideStats[index].value == null ? 0 : character.overrideStats[index].value),
		total = base + bonus;
	$.each(character.modifiers.feat, function(index, value) {
		if (value.entityId == scoreId && value.type == 'bonus') {
			total += value.value;
		}
	});
	if (override > 0) total = override;

	if (total > 20) {
		total = 20;
	}
	return total;
};

function pad(num, size) {
	var s = num + "";

	while (s.length < size) s = "0" + s;
	return s;
}

function invokeSaveAsDialog(file, fileName) {
	if (!file) {
		throw 'Blob object is required.';
	}

	if (!file.type) {
		file.type = 'video/webm';
	}

	var fileExtension = file.type.split('/')[1];

	if (fileName && fileName.indexOf('.') !== -1) {
		var splitted = fileName.split('.');
		fileName = splitted[0];
		fileExtension = splitted[1];
	}

	var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

	if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
		return navigator.msSaveOrOpenBlob(file, fileFullName);
	} else if (typeof navigator.msSaveBlob !== 'undefined') {
		return navigator.msSaveBlob(file, fileFullName);
	}

	var hyperlink = document.createElement('a');
	hyperlink.href = URL.createObjectURL(file);
	hyperlink.target = '_blank';
	hyperlink.download = fileFullName;

	if (!!navigator.mozGetUserMedia) {
		hyperlink.onclick = function() {
			(document.body || document.documentElement).removeChild(hyperlink);
		};
		(document.body || document.documentElement).appendChild(hyperlink);
	}

	var evt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	});

	hyperlink.dispatchEvent(evt);

	if (!navigator.mozGetUserMedia) {
		URL.revokeObjectURL(hyperlink.href);
	}
}

var dispLinks = (function() {
	function _createLinks() {
		var userLinks = $('#displayLinks');
		var offset = userLinks.offset();
		$('#Linkwindow').jqxWindow({
			position: {
				x: 150,
				y: 150
			},
			theme: 'darkblue',
			isModal: true,
			showCollapseButton: true,
			maxHeight: 400,
			maxWidth: 700,
			minHeight: 200,
			minWidth: 200,
			height: 300,
			width: 500,
			initContent: function() {
				$('#Linkwindow').jqxWindow('focus');
			}
		});
	}
	return {
		config: {
			dragArea: null
		},
		init: function() {
			_createLinks();
		}
	};
}());

var clLinks = (function() {
	function _createCL() {
		var userCL = $('#displayCL');
		var offset = userCL.offset();
		$('#CLwindow').jqxWindow({
			position: {
				x: 150,
				y: 50
			},
			theme: 'darkblue',
			showCollapseButton: true,
			maxWidth: 700,
			minWidth: 200,
			height: 450,
			width: 500,
			resizable: true,
			isModal: true,
			initContent: function() {
				$('#CLwindow').jqxWindow('focus');
			}
		});
	}
	return {
		config: {
			dragArea: null
		},
		init: function() {
			_createCL();
		}
	};
}());

var donateFGC = (function() {
	function _createDon() {
		var userDon = $('#displayDon');
		var offset = userDon.offset();
		$('#DONwindow').jqxWindow({
			position: {
				x: 150,
				y: 150
			},
			theme: 'darkblue',
			isModal: true,
			showCollapseButton: true,
			maxHeight: 400,
			maxWidth: 700,
			minHeight: 200,
			minWidth: 200,
			height: 300,
			width: 500,
			initContent: function() {
				$('#DONwindow').jqxWindow('focus');
			}
		});
	}
	return {
		config: {
			dragArea: null
		},
		init: function() {
			_createDon();
		}
	};
}());

const getObjects = function(obj, key, val) {

	// Check (character, '', _ABILITY[_ABILITIES[scoreId]] + "-score");
	// const _ABILITIES = {1:"STR",2:"DEX",3:"CON",4:"INT",5:"WIS",6:"CHA"};
	// const _ABILITY = {"STR": "strength", "DEX": "dexterity", "CON": "constitution", "INT": "intelligence", "WIS": "wisdom", "CHA": "charisma"};

	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjects(obj[i], key, val));
		} else if (i == key && obj[i] == val || i == key && val == '') {
			//if (key == 'type')
			objects.push(obj);
		} else if (obj[i] == val && key == '') {
			if (objects.lastIndexOf(obj) == -1) {
				objects.push(obj);
			}
		}
	}
	return objects;
};

function replaceDash(str) {
	firstStep = str.replace(/-/g, "_");
	return firstStep.replace(/\s/g, "_");
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function fixQuote(badString) {
	if (badString == "" || badString == null) {
		return "";
	}
	return badString.replace(/\n/g, '\n').replace(/\u2019/g, "'").replace(/\u2014/g, "-").replace(/"/g, "&#34;").replace(/\u2022/g, ":").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "'").replace(/\s&/g, "&amp;").trim();
}

function fixDesc(badString) {
	if (badString == "" || badString == null) {
		return "";
	}
	var tempString1 = badString.replace(/<a\s.*?\">/g, "").replace(/<\/a>/g, "").replace(/<\/span>/g, "");
	var tempString2 = tempString1.replace(/<img.*?">/g, "").replace(/<hr>/g, "<hr />").replace(/<span>/g, "");
	var tempString3 = tempString2.replace(/<br>/g, "<br />").replace(/&rsquo;/g, "'").replace(/&nbsp;/g, " ");
	var tempString4 = tempString3.replace(/&ldquo;/g, '"').replace(/<span\s.*?">/g, "").replace(/<em>/g, "").replace(/<\/em>/g, "");
	var tempString5 = tempString4.replace(/&ndash;/g, '-').replace(/&lsquo;/g, "'");
	return tempString5.replace(/&rdquo;/g, '"').replace(/&mdash;/g, "-").replace(/&times;/g, "*").replace(/&minus;/g, "-").replace(/&hellip;/g, "...").trim();
}

function convert_case(str) {
    var lower = str.toLowerCase();
    return lower.replace(/(^|\s)(w)/g, function(x) {
        return x.toUpperCase();
    });
}