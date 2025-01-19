/*jshint esversion: 6 */
/*jshint multistr: true */

/* 
    Original script by:
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
       Discord: BoomerET
       Fantasy Grounds: BoomerET
       Github: https://github.com/BoomerET
       Reddit: https://www.reddit.com/user/BoomerET
       Roll20: https://app.roll20.net/users/9982/boomeret
       Paypal.me: https://paypal.me/boomeret
       (All contributions are donated to Hospice,
          or go here: https://www.hollandhospice.org/giving/donate-now/)
*/

var startXML = '<?xml version="1.0" encoding="utf-8"?>\n';
startXML +=
  '<root version="4.6" dataversion="20241002" release="8.1|CoreRPG:6">\n';
startXML += "\t<character>\n";

var endXML = "\t</character>\n";
endXML += "</root>\n";

var allXML = "";
buildXML = "";

var alertString = "";

// Flag for Classes
var isBarbarian = false;
var isBard = false;
var isCleric = false;
var isDruid = false;
var isFighter = false;
var isMonk = false;
var isPaladin = false;
var isRanger = false;
var isRogue = false;
var isSorcerer = false;
var isWarlock = false;
var isWizard = false;

// Species/Race flags
var isAasimar = false;
var isDragonborn = false;
var isDwarf = false;
var isElf = false;
var isGnome = false;
var isGoliath = false;
var isHalfling = false;
var isHuman = false;
var isOrc = false;
var isTiefling = false;

// Class levels
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

// Subclass flags
var barbarianSubclassBerserker = false;
var barbarianSubclassWildHeart = false;
var barbarianSubclassWorldTree = false;
var barbarianSubclassZealot = false;

var bardSubclassDance = false;
var bardSubclassGlamour = false;
var bardSubclassLore = false;
var bardSubclassValor = false;

var clericSubclassLife = false;
var clericSubclassLight = false;
var clericSubclassTrickery = false;
var clericSubclassWar = false;

var druidSubclassLand = false;
var druidSubclassMoon = false;
var druidSubclassSea = false;
var druidSubclassStars = false;

var fighterSubclassBattleMaster = false;
var fighterSubclassChampion = false;
var fighterSubclassEldritchKnight = false;
var fighterSubclassPsiWarrior = false;

var monkSubclassMercy = false;
var monkSubclassShadow = false;
var monkSubclassElements = false;
var monkSubclassOpenHand = false;

var paladinSubclassDevotion = false;
var paladinSubclassGlory = false;
var paladinSubclassAncients = false;
var paladinSubclassVengeance = false;

var rangerSubclassBeastMaster = false;
var rangerSubclassFeyWanderer = false;
var rangerSubclassGloomStalker = false;
var rangerSubclassHunter = false;

var rogueSubclassArcaneTrickster = false;
var rogueSubclassAssassin = false;
var rogueSubclassSoulknife = false;
var rogueSubclassThief = false;

var sorcererSubclassAberrant = false;
var sorcererSubclassClockwork = false;
var sorcererSubclassDraconic = false;
var sorcererSubclassWildMagic = false;

var warlockSubclassArchfey = false;
var warlockSubclassCelestial = false;
var warlockSubclassFiend = false;
var warlockSubclassGreatOldOne = false;

var wizardSubclassAbjurer = false;
var wizardSubclassDiviner = false;
var wizardSubclassEvoker = false;
var wizardSubclassIllusionist = false;

// Background flags
isAcolyte = false;
isArtiasn = false;
isCharlatan = false;
isCriminal = false;
isEntertainer = false;
isFarmer = false;
isGuard = false;
isGuide = false;
isHermit = false;
isMerchant = false;
isNoble = false;
isSage = false;
isSailor = false;
isScribe = false;
isSoldier = false;
isWayfarer = false;

// Feat flags
isEpicBoonofCombatProwess = false;
isEpicBoonofDimensionalTravel = false;
isEpicBoonofEnergyResistance = false;
isEpicBoonofFate = false;
isEpicBoonofFortitude = false;
isEpicBoonofIrresistibleOffense = false;
isEpicBoonofRecovery = false;
isEpicBoonofSkill = false;
isEpicBoonofSpeed = false;
isEpicBoonofSpellRecall = false;
isEpicBoonoftheNightSpirit = false;
isEpicBoonofTruesight = false;
isFightingArchery = false;
isFightingBlindFighting = false;
isFightingDefense = false;
isFightingDueling = false;
isFightingGreatWeaponFighting = false;
isFightingTwoWeaponFighting = false;
isFightingUnarmedFighting = false;
isFightingInterception = false;
isFightingProtection = false;
isFightingThrownWeaponFighting = false;
isGeneralActor = false;
isGeneralAthlete = false;
isGeneralCharger = false;
isGeneralCrossbowExpert = false;
isGeneralCrusher = false;
isGeneralChef = false;
isGeneralDurable = false;
isGeneralElementalAdept = false;
isGeneralFeyTouched = false;
isGeneralGrappler = false;
isGeneralHeavilyArmored = false;
isGeneralHeavyArmorMaster = false;
isGeneralInspiringLeader = false;
isGeneralDualWielder = false;
isGeneralObservant = false;
isGeneralPiercer = false;
isGeneralPoisoner = false;
isGeneralPolearmMaster = false;
isGeneralKeenMind = false;
isGeneralLightlyArmored = false;
isGeneralWarCaster = false;
isGeneralGreatWeaponMaster = false;
isGeneralMageSlayer = false;
isGeneralMartialWeaponTraining = false;
isGeneralMediumArmorMaster = false;
isGeneralModeratelyArmored = false;
isGeneralMountedCombatant = false;
isGeneralResilient = false;
isGeneralRitualCaster = false;
isGeneralSkillExpert = false;
isGeneralSkulker = false;
isGeneralSlasher = false;
isGeneralSpeedy = false;
isGeneralSpellSniper = false;
isGeneralSentinel = false;
isGeneralShadowTouched = false;
isGeneralSharpshooter = false;
isGeneralShieldMaster = false;
isGeneralTelekinetic = false;
isGeneralDefensiveDuelist = false;
isGeneralTelepathic = false;
isOriginAlert = false;
isOriginTough = false;
isOriginCrafter = false;
isOriginLucky = false;
isOriginMagicInitiate = false;
isOriginMusician = false;
isOriginHealer = false;
isOriginSavageAttacker = false;
isOriginSkilled = false;
isOriginTavernBrawler = false;

// Class variables
var totalClassLevels = 0;
var startingClassID = 0;
var proficiencyBonus = 0;
var classReference = "";
var classSpecialization = "";
var classSpecializationCode = "";

var totalHP = 0;
var sumHP = 0;

// Class base Hitpoints
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

// Level advance fixed hitpoints
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

// Skills & Abilities
const abilitiesList = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];
const skillsList = [
  "acrobatics",
  "animal_handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight_of_hand",
  "stealth",
  "survival",
];
const skillsReference = [
  "dexterity",
  "wisdom",
  "intelligence",
  "strength",
  "charisma",
  "intelligence",
  "wisdom",
  "charisma",
  "intelligence",
  "wisdom",
  "intelligence",
  "wisdom",
  "charisma",
  "charisma",
  "intelligence",
  "dexterity",
  "dexterity",
  "wisdom",
];

// Create hashmap for skills
const skillsMap = {};
for (let i = 0; i < skillsList.length; i++) {
  skillsMap[skillsList[i]] = 0;
}

// Ability scores/modifiers
var strengthScore = 0;
var strengthModifier = 0;
var strengthProficiency = 0;
var charismaScore = 0;
var charismaModifier = 0;
var charismaProficiency = 0;
var constitutionScore = 0;
var constitutionModifier = 0;
var constitutionProficiency = 0;
var intelligenceScore = 0;
var intelligenceModifier = 0;
var intelligenceProficiency = 0;
var dexterityScore = 0;
var dexterityModifier = 0;
var dexterityProficiency = 0;
var wisdomScore = 0;
var wisdomModifier = 0;
var wisdomProficiency = 0;

// Global variables used for various sections
var thisIteration = 0;
var pcFilename = "";
var numArrows = 0;
var numNeedles = 0;
var numBolts = 0;
var numBullets = 0;
var walkSpeed = 0;
var addSpeed = 0;
var charAlign = "";
var hasAppear = 0;

const simpleMeleeWeapon = [
    "club",
    "dagger",
    "greatclub",
    "handaxe",
    "javelin",
    "light_hammer",
    "mace",
    "quartrsfaff",
    "sickle",
    "spear",
  ];

const simpleRangedWeapon = ["crossbow_light", "dart", "showtbow", "sling"];

const martialMeleeWeapon = [
  "battleaxe",
  "flail",
  "glaive",
  "greataxe",
  "greatsword",
  "halberd",
  "lance",
  "longsword",
  "maul",
  "morningstar",
  "pike",
  "rapier",
  "scimitar",
  "shortsword",
  "trident",
  "war_pick",
  "warhammer",
  "whip",
];

const martialRangedWeapon = [
  "blowgun",
  "crossbow_hand",
  "crossbow_heavy",
  "longbow",
  "net",
];

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

$(function () {
  dispLinks.init();
  clLinks.init();
  donateFGC.init();

  $("#Linkwindow").jqxWindow("close");
  $("#CLwindow").jqxWindow("close");
  $("#DONwindow").jqxWindow("close");
  $("#getCharacterData").jqxButton({
    width: "150px",
    height: "35px",
    theme: "orange",
  });
  $("#textHere").jqxTextArea({
    theme: "orange",
    width: 750,
    height: 150,
    placeHolder: "XML will appear here.",
  });
  $("#getcharID").jqxInput({
    placeHolder: "Enter Character ID",
    height: "35px",
    width: 200,
    minLength: 4,
    theme: "orange",
  });
  $("#dlChar").jqxButton({
    width: "120px",
    height: "35px",
    theme: "orange",
  });
  $("#resetChar").jqxButton({
    width: "120px",
    height: "35px",
    theme: "orange",
  });
  $("#jqxMenu").jqxMenu({
    width: 95,
    height: "145px",
    mode: "vertical",
    theme: "orange",
  });
  $("#jqxMenu").css("visibility", "visible");

  $("#extLinks").click(function (e) {
    e.preventDefault();
    $("#Linkwindow").jqxWindow("open");
  });
  $("#goHome").click(function (e) {
    e.preventDefault();
    window.location.reload(false);
  });
  $("#contactUs").click(function (e) {
    e.preventDefault();
    window.open(
      "https://www.fantasygrounds.com/forums/showthread.php?82766-D-amp-D-Beyond-converter-for-2024-PHB-to-FGU-Player-Characters",
      "_blank"
    );
  });
  $("#showChangelog").click(function (e) {
    e.preventDefault();
    $("#CLwindow").jqxWindow("open");
  });
  $("#showDonations").click(function (e) {
    e.preventDefault();
    $("#DONwindow").jqxWindow("open");
  });

  console.log("Starting conversion.");
  //$.getJSON('characters/TestGiantGoliath3.json', function(data) {
  //$.getJSON('characters/AbjurerWizard3.json', function(data) {
  //$.getJSON('characters/DivinerWizard3.json', function(data) {
  //$.getJSON('characters/EvokerWizard3.json', function(data) {
  //$.getJSON('characters/IllusionistWizard3.json', function(data) {
  //$.getJSON('characters/ArchfeyWarlock3.json', function(data) {
  //$.getJSON('characters/CelestialWarlock3.json', function(data) {
  //$.getJSON('characters/FiendWarlock3.json', function(data) {
  //$.getJSON('characters/GreatOldOneWarlock3.json', function(data) {
  //$.getJSON('characters/BeastMasterRanger3.json', function(data) {
  //$.getJSON('characters/FeyWandererRanger3.json', function(data) {
  //$.getJSON('characters/GloomStalkerRanger3.json', function(data) {
  //$.getJSON('characters/HunterRanger3.json', function(data) {
  //$.getJSON('characters/DevotionPaladin3.json', function(data) {
  //$.getJSON('characters/GloryPaladin3.json', function(data) {
  //$.getJSON('characters/AncientsPaladin3.json', function(data) {
  //$.getJSON('characters/VengeancePaladin3.json', function(data) {
  //$.getJSON('characters/MercyMonk3.json', function(data) {
  //$.getJSON('characters/ShadowMonk3.json', function(data) {
  //$.getJSON('characters/ElementsMonk3.json', function(data) {
  //$.getJSON('characters/OpenHandMonk3.json', function(data) {
  //$.getJSON('characters/BattleMasterFighter3.json', function(data) {
  //$.getJSON('characters/ChampionFighter3.json', function(data) {
  //$.getJSON('characters/EldritchKnightFighter3.json', function(data) {
  //$.getJSON('characters/PsiWarriorFighter3.json', function(data) {
  //$.getJSON('characters/LandDruid3.json', function(data) {
  //$.getJSON('characters/MoonDruid3.json', function(data) {
  //$.getJSON('characters/SeaDruid3.json', function(data) {
  //$.getJSON('characters/StarsDruid3.json', function(data) {
  //$.getJSON('characters/LifeCleric3.json', function(data) {
  //$.getJSON('characters/LightCleric3.json', function(data) {
  //$.getJSON('characters/TrickeryCleric3.json', function(data) {
  //$.getJSON('characters/WarCleric3.json', function(data) {
  //$.getJSON('characters/DanceBard3.json', function(data) {
  //$.getJSON('characters/GlamourBard3.json', function(data) {
  //$.getJSON('characters/LoreBard3.json', function(data) {
  //$.getJSON('characters/ValorBard3.json', function(data) {
  //$.getJSON('characters/ZealotBarbarian3.json', function(data) {
  //$.getJSON('characters/WorldTreeBarbarian3.json', function(data) {
  //$.getJSON('characters/WildHeartBarbarian3.json', function(data) {
  //$.getJSON('characters/BerserkerBarbarian3.json', function(data) {
  //$.getJSON('characters/ThiefRogue3.json', function(data) {
  //$.getJSON('characters/SoulknifeRogue3.json', function(data) {
  //$.getJSON('characters/AssassinRogue3.json', function(data) {
  //$.getJSON('characters/ArcaneTricksterRogue3.json', function(data) {
  //$.getJSON('characters/WildMagicSorcerer5.json', function(data) {
  //$.getJSON('characters/DraconicSorcerer5.json', function(data) {
  //$.getJSON('characters/ClockworkSorcerer5.json', function(data) {
  //$.getJSON('characters/5thLevelSorcy.json', function(data) {
  //$.getJSON('characters/CompTiefSorc_DnDB.json', function(data) {
  //$.getJSON('characters/TestSubClass-Goliath.json', function(data) {
  //$.getJSON('characters/WoodElf.json', function(data) {
  //$.getJSON('characters/DrowElf.json', function(data) {
  //$.getJSON('characters/CloudGiant.json', function(data) {
  //$.getJSON('characters/FrostGiant.json', function(data) {
  //$.getJSON('characters/HillGiant.json', function(data) {
  //$.getJSON('characters/StormGiant.json', function(data) {
  //$.getJSON('characters/StoneGiant.json', function(data) {
  //$.getJSON('characters/GuideMonkHuman1.json', function(data) {
  //$.getJSON('characters/GuideMonkFarmer.json', function(data) {
  //$.getJSON('characters/GuideMonkCriminal.json', function(data) {
  //$.getJSON('characters/Baradun.JSON', function(data) {
  //  parseCharacter(data);
  //});
});

$("#dlChar").on("click", function () {
  if ($("#textHere").val() == "") {
    alert("You need to load a character first.");
    return;
  }
  if (pcFilename == "" || pcFilename == null) {
    var ts = Math.round(new Date().getTime() / 1000);
    pcFilename = ts + ".xml";
  } else {
    pcFilename += ".xml";
  }

  var textFile = new Blob([$("#textHere").val()], {
    type: "text/plain",
  });
  invokeSaveAsDialog(textFile, pcFilename);
});

$("#getCharacterData").on("click", function () {
  if (!$("#getcharID").val().trim().match(/\d+/)) {
    alert("No Character ID entered");
  } else if ($("#textHere").val() != "") {
    var resetMe = confirm("You need to clear previous data, should I do that?");
    if (resetMe == 1) {
      window.location.reload(false);
    }
  } else {
    $.ajax({
      data: {
        charID: $("#getcharID").val().trim(),
      },
      url: "scripts/getChar.php",
      method: "GET",
      success: function (data) {
        try {
          parseCharacter($.parseJSON(data));
        } catch (e) {
          alert("Unable to parse character: " + $("#getcharID").val().trim());
          console.error(e);
          return;
        }
      },
      failure: function (msg) {
        alert("Unable to find character: " + $("#getcharID").val().trim());
        return;
      },
    });
    const url = "https://character-service.dndbeyond.com/character/v5/character/";
    const charID = $('#getcharID').val().trim();
    //const proxyurl = "https://uakari-indigo.fly.dev/";
    //const fetchurl = proxyurl + url + charID;
    //let headers = new Headers();
    //headers.append('Content-Type', 'text/plain');
    //fetch(fetchurl)
    //    .then(response => response.text())
    //    .then(contents => parseCharacter($.parseJSON(contents)))
    //    //.then(contents => console.log(contents))
    //    .catch(() => {
    //        console.log("Cant access " + url + " response. Blocked by browser?");
    //    });
  }
});

function parseCharacter(inputChar) {
  //let charType = $('input[name="import_type"]:checked').val();
  var charStatus = jQuery.extend(true, {}, inputChar);
  var character = jQuery.extend(true, {}, inputChar.data);
  if (charStatus.hasOwnProperty("errorCode")) {
    alertString = " could not be found.\n";
    alertString += "Either the character doesn't actually exist,\n";
    alertString +=
      "or the character is set to 'Private' instead of 'Public'.\n\n";
    alertString += "Yes, your character MUST be set to PUBLIC.";
    alert("Character " + $("#getcharID").val() + alertString);
    return;
  }

  // Character classes
  buildXML += "\t\t<classes>\n";
  character.classes.some(function (current_class, i) {
    thisClass = current_class.definition.name.toLowerCase();
    thisIteration = pad(i + 1, 5);
    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
    buildXML += '\t\t\t\t<hddie type="dice">';
    buildXML += "d" + current_class.definition.hitDice;
    buildXML += "</hddie>\n";
    buildXML +=
      '\t\t\t\t<name type="string">' +
      current_class.definition.name +
      "</name>\n";
    if (thisClass == "barbarian") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      isBarbarian = true;
      classReference = "class.id-00001";
      levelBarbarian = current_class.level;
      totalClassLevels += levelBarbarian;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Path of the Berserker":
            barbarianSubclassBerserker = true;
            classSpecializationCode = "id-00001@*";
            break;
          case "Path of the Wild Heart":
            barbarianSubclassWildHeart = true;
            classSpecializationCode = "id-00002@*";
            break;
          case "Path of the World Tree":
            barbarianSubclassWorldTree = true;
            classSpecializationCode = "id-00003@*";
            break;
          case "Path of the Zealot":
            barbarianSubclassZealot = true;
            classSpecializationCode = "id-00004@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartBarbarian + (levelBarbarian - 1) * hpBarbarian;
      } else {
        sumHP += levelBarbarian * hpBarbarian;
      }
    } else if (thisClass == "bard") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isBard = true;
      classReference = "class.id-00004";
      levelBard = current_class.level;
      totalClassLevels += levelBard;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "College of Dance":
            bardSubclassDance = true;
            classSpecializationCode = "id-00013@*";
            break;
          case "College of Glamour":
            bardSubclassGlamour = true;
            classSpecializationCode = "id-00014@*";
            break;
          case "College of Lore":
            bardSubclassLore = true;
            classSpecializationCode = "id-00015@*";
            break;
          case "College of Valor":
            bardSubclassValor = true;
            classSpecializationCode = "id-00016@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartBard + (levelBard - 1) * hpBard;
      } else {
        sumHP += levelBard * hpBard;
      }
    } else if (thisClass == "cleric") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isCleric = true;
      classReference = "class.id-00005";
      levelCleric = current_class.level;
      totalClassLevels += levelCleric;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Life Domain":
            clericSubclassLife = true;
            classSpecializationCode = "id-00017@*";
            break;
          case "Light Domain":
            clericSubclassLight = true;
            classSpecializationCode = "id-00018@*";
            break;
          case "Trickery Domain":
            clericSubclassTrickery = true;
            classSpecializationCode = "id-00019@*";
            break;
          case "War Domain":
            clericSubclassWar = true;
            classSpecializationCode = "id-00048@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartCleric + (levelCleric - 1) * hpCleric;
      } else {
        sumHP += levelCleric * hpCleric;
      }
    } else if (thisClass == "druid") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isDruid = true;
      classReference = "class.id-00003";
      levelDruid = current_class.level;
      totalClassLevels += levelDruid;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Circle of the Land":
            druidSubclassLand = true;
            classSpecializationCode = "id-00005@*";
            break;
          case "Circle of the Moon":
            druidSubclassMoon = true;
            classSpecializationCode = "id-00006@*";
            break;
          case "Circle of the Sea":
            druidSubclassSea = true;
            classSpecializationCode = "id-00007@*";
            break;
          case "Circle of the Stars":
            druidSubclassStars = true;
            classSpecializationCode = "id-00008@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartDruid + (levelDruid - 1) * hpDruid;
      } else {
        sumHP += levelDruid * hpDruid;
      }
    } else if (thisClass == "fighter") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      isFighter = true;
      classReference = "class.id-00006";
      levelFighter = current_class.level;
      totalClassLevels += levelFighter;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Battle Master":
            fighterSubclassBattleMaster = true;
            classSpecializationCode = "id-00020@*";
            break;
          case "Champion":
            fighterSubclassChampion = true;
            classSpecializationCode = "id-00021@*";
            break;
          case "Eldritch Knight":
            fighterSubclassEldritchKnight = true;
            classSpecializationCode = "id-00022@*";
            buildXML +=
              '\t\t\t\t<casterlevelinvmult type="number">3</casterlevelinvmult>\n';
            break;
          case "Psi Warrior":
            fighterSubclassPsiWarrior = true;
            classSpecializationCode = "id-00023@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartFighter + (levelFighter - 1) * hpFighter;
      } else {
        sumHP += levelFighter * hpFighter;
      }
    } else if (thisClass == "monk") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      isMonk = true;
      classReference = "class.id-00003";
      levelMonk = current_class.level;
      totalClassLevels += levelMonk;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Warrior of Mercy":
            monkSubclassMercy = true;
            classSpecializationCode = "id-00009@*";
            break;
          case "Warrior of Shadow":
            monkSubclassShadow = true;
            classSpecializationCode = "id-00010@*";
            break;
          case "Warrior of the Elements":
            monkSubclassElements = true;
            classSpecializationCode = "id-00011@*";
            break;
          case "Warrior of the Open Hand":
            monkSubclassOpenHand = true;
            classSpecializationCode = "id-00012@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartMonk + (levelMonk - 1) * hpMonk;
      } else {
        sumHP += levelMonk * hpMonk;
      }
    } else if (thisClass == "paladin") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">2</casterlevelinvmult>\n';
      isPaladin = true;
      classReference = "class.id-00007";
      levelPaladin = current_class.level;
      totalClassLevels += levelPaladin;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Oath of Devotion":
            paladinSubclassDevotion = true;
            classSpecializationCode = "id-00024@*";
            break;
          case "Oath of Glory":
            paladinSubclassGlory = true;
            classSpecializationCode = "id-00025@*";
            break;
          case "Oath of the Ancients":
            paladinSubclassAncients = true;
            classSpecializationCode = "id-00026@*";
            break;
          case "Oath of Vengeance":
            paladinSubclassVengeance = true;
            classSpecializationCode = "id-00027@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartPaladin + (levelPaladin - 1) * hpPaladin;
      } else {
        sumHP += levelPaladin * hpPaladin;
      }
    } else if (thisClass == "ranger") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">2</casterlevelinvmult>\n';
      isRanger = true;
      classReference = "class.id-00008";
      levelRanger = current_class.level;
      totalClassLevels += levelRanger;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Beast Master":
            rangerSubclassBeastMaster = true;
            classSpecializationCode = "id-00028@*";
            break;
          case "Fey Wanderer":
            rangerSubclassFeyWanderer = true;
            classSpecializationCode = "id-00029@*";
            break;
          case "Gloom Stalker":
            rangerSubclassGloomStalker = true;
            classSpecializationCode = "id-00030@*";
            break;
          case "Hunter":
            rangerSubclassHunter = true;
            classSpecializationCode = "id-00031@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartRanger + (levelRanger - 1) * hpRanger;
      } else {
        sumHP += levelRanger * hpRanger;
      }
    } else if (thisClass == "rogue") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      isRogue = true;
      classReference = "class.id-00009";
      levelRogue = current_class.level;
      totalClassLevels += levelRogue;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Arcane Trickster":
            rogueSubclassArcaneTrickster = true;
            classSpecializationCode = "id-00032@*";
            buildXML +=
              '\t\t\t\t<casterlevelinvmult type="number">3</casterlevelinvmult>\n';
            break;
          case "Assassin":
            rogueSubclassAssassin = true;
            classSpecializationCode = "id-00033@*";
            break;
          case "Soulknife":
            rogueSubclassSoulknife = true;
            classSpecializationCode = "id-00034@*";
            break;
          case "Thief":
            rogueSubclassThief = true;
            classSpecializationCode = "id-00035@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartRogue + (levelRogue - 1) * hpRogue;
      } else {
        sumHP += levelRogue * hpRogue;
      }
    } else if (thisClass == "sorcerer") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isSorcerer = true;
      classReference = "class.id-00010";
      levelSorcerer = current_class.level;
      totalClassLevels += levelSorcerer;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        // classSpecialization = current_class.subclassDefinition.name;
        switch (current_class.subclassDefinition.name) {
          case "Aberrant Sorcery":
            sorcererSubclassAberrant = true;
            classSpecializationCode = "id-00036@*";
            break;
          case "Clockwork Sorcery":
            sorcererSubclassClockwork = true;
            classSpecializationCode = "id-00037@*";
            break;
          case "Draconic Sorcery":
            sorcererSubclassDraconic = true;
            classSpecializationCode = "id-00038@*";
            break;
          case "Wild Magic Sorcery":
            sorcererSubclassWildMagic = true;
            classSpecializationCode = "id-00039@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartSorcerer + (levelSorcerer - 1) * hpSorcerer;
      } else {
        sumHP += levelSorcerer * hpSorcerer;
      }
    } else if (thisClass == "warlock") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">1</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isWarlock = true;
      classReference = "class.id-00011";
      levelWarlock = current_class.level;
      totalClassLevels += levelWarlock;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        switch (current_class.subclassDefinition.name) {
          case "Archfey Patron":
            warlockSubclassArchfey = true;
            classSpecializationCode = "id-00040@*";
            break;
          case "Celestial Patron":
            warlockSubclassCelestial = true;
            classSpecializationCode = "id-00041@*";
            break;
          case "Fiend Patron":
            warlockSubclassFiend = true;
            classSpecializationCode = "id-00042@*";
            break;
          case "Great Old One Patron":
            warlockSubclassGreatOldOne = true;
            classSpecializationCode = "id-00043@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartWarlock + (levelWarlock - 1) * hpWarlock;
      } else {
        sumHP += levelWarlock * hpWarlock;
      }
    } else if (thisClass == "wizard") {
      buildXML +=
        '\t\t\t\t<casterpactmagic type="number">0</casterpactmagic>\n';
      buildXML +=
        '\t\t\t\t<casterlevelinvmult type="number">1</casterlevelinvmult>\n';
      isWizard = true;
      classReference = "class.id-00012";
      levelWizard = current_class.level;
      totalClassLevels += levelWizard;
      if (
        current_class.hasOwnProperty("subclassDefinition") &&
        current_class.subclassDefinition != null
      ) {
        switch (current_class.subclassDefinition.name) {
          case "Abjurer":
            wizardSubclassAbjurer = true;
            classSpecializationCode = "id-00044@*";
            break;
          case "Diviner":
            wizardSubclassDiviner = true;
            classSpecializationCode = "id-00045@*";
            break;
          case "Evoker":
            wizardSubclassEvoker = true;
            classSpecializationCode = "id-00046@*";
            break;
          case "Illusionist":
            wizardSubclassIllusionist = true;
            classSpecializationCode = "id-00047@*";
            break;
          default:
        }
      }
      if (current_class.isStartingClass == true) {
        sumHP += hpStartWizard + (levelWizard - 1) * hpWizard;
      } else {
        sumHP += levelWizard * hpWizard;
      }
    }
    // If there's a class specialization
    if (
      current_class.hasOwnProperty("subclassDefinition") &&
      current_class.subclassDefinition != null
    ) {
      classSpecialization = current_class.subclassDefinition.name;
      buildXML +=
        '\t\t\t\t<specialization type="string">' +
        classSpecialization +
        "</specialization>\n";
      buildXML += '\t\t\t\t<specializationlink type="windowreference">\n';
      buildXML += "\t\t\t\t\t<class>reference_class_specialization</class>\n";
      buildXML +=
        "\t\t\t\t\t<recordname>class_specialization." +
        classSpecializationCode +
        "</recordname>\n";
      buildXML += "\t\t\t\t</specializationlink>\n";
      buildXML +=
        '\t\t\t\t<specializationversion type="string">2024</specializationversion>\n';
    }
    buildXML +=
      '\t\t\t\t<level type="number">' + current_class.level + "</level>\n";
    buildXML += '\t\t\t\t<shortcut type="windowreference">\n';
    buildXML += "\t\t\t\t\t<class>reference_class</class>\n";
    buildXML += "\t\t\t\t\t<recordname>" + classReference + "@*</recordname>\n";
    buildXML += "\t\t\t\t</shortcut>\n";
    buildXML +=
      '\t\t\t\t<specialization type="string">' +
      classSpecialization +
      "</specialization>\n";
    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    buildXML += "\t\t</classes>\n";
  });

  if (character.background.definition != null) {
    switch (character.background.definition.name) {
      case "Acolyte":
        isAcolyte = true;
        isOriginMagicInitiate = true;
        buildXML +=
          '\t\t<background type="string">Acolyte</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00002@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Artisan":
        isArtiasn = true;
        isOriginCrafter = true;
        buildXML +=
          '\t\t<background type="string">Artisan</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00005@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Charlatan":
        isCharlatan = true;
        isOriginSkilled = true;
        buildXML +=
          '\t\t<background type="string">Charlatan</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00003@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Criminal":
        isCriminal = true;
        isOriginAlert = true;
        buildXML +=
          '\t\t<background type="string">Criminal</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00004@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Entertainer":
        isEntertainer = true;
        isOriginMusician = true;
        buildXML +=
          '\t\t<background type="string">Entertainer</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00006@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Farmer":
        isFarmer = true;
        isOriginTough = true;
        buildXML +=
          '\t\t<background type="string">Farmer</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00005@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Guard":
        isGuard = true;
        isOriginAlert = true;
        buildXML +=
          '\t\t<background type="string">Guard</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00008@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Guide":
        isGuide = true;
        isOriginMagicInitiate = true;
        buildXML +=
          '\t\t<background type="string">Guide</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00009@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Hermit":
        isHermit = true;
        isOriginHealer = true;
        buildXML +=
          '\t\t<background type="string">Hermit</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00010@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Merchant":
        isMerchant = true;
        isOriginLucky = true;
        buildXML +=
          '\t\t<background type="string">Merchant</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00007@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Noble":
        isNoble = true;
        isOriginSkilled = true;
        buildXML +=
          '\t\t<background type="string">Noble</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00012@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Sage":
        isSage = true;
        isOriginMagicInitiate = true;
        buildXML +=
          '\t\t<background type="string">Sage</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00014@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Sailor":
        isSailor = true;
        isOriginTavernBrawler = true;
        buildXML +=
          '\t\t<background type="string">Sailor</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00015@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Scribe":
        isScribe = true;
        isOriginSkilled = true;
        buildXML +=
          '\t\t<background type="string">Scribe</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00011@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Soldier":
        isSoldier = true;
        isOriginSavageAttacker = true;
        buildXML +=
          '\t\t<background type="string">Soldier</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00016@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      case "Wayfarer":
        isWayfarer = true;
        isOriginLucky = true;
        buildXML +=
          '\t\t<background type="string">Wayfarer</background>\n\t\t<backgroundlink type="windowreference">\n\t\t\t<class>reference_background</class>\n\t\t\t<recordname>background.id-00017@*</recordname>\n\t\t</backgroundlink>\n';
        break;
      default:
    }
  }
  buildXML += '\t\t<backgroundversion type="string">2024</backgroundversion>\n';

  if (character.race.fullName != null) {
    buildXML +=
      '\t\t<race type="string">' + character.race.fullName + "</race>\n";
    buildXML += '\t\t<racelink type="windowreference">\n';
    buildXML += "\t\t\t<class>reference_race</class>\n";
    switch (character.race.fullName) {
      case "Aasimar":
        isAasimar = true;
        buildXML += "\t\t\t<recordname>race.id-00004@*</recordname>\n";
        break;
      case "Dragonborn":
        isDragonborn = true;
        buildXML += "\t\t\t<recordname>race.id-00005@*</recordname>\n";
        break;
      case "Dwarf":
        isDwarf = true;
        buildXML += "\t\t\t<recordname>race.id-00001@*</recordname>\n";
        break;
      case "Elf":
        isElf = true;
        buildXML += "\t\t\t<recordname>race.id-00002@*</recordname>\n";
        break;
      case "Gnome":
        isGnome = true;
        buildXML += "\t\t\t<recordname>race.id-00007@*</recordname>\n";
        break;
      case "Goliath":
        isGoliath = true;
        buildXML += "\t\t\t<recordname>race.id-00006@*</recordname>\n";
        break;
      case "Halfling":
        isHalfling = true;
        buildXML += "\t\t\t<recordname>race.id-00008@*</recordname>\n";
        break;
      case "Human":
        isHuman = true;
        buildXML += "\t\t\t<recordname>race.id-00003@*</recordname>\n";
        break;
      case "Orc":
        isOrc = true;
        buildXML += "\t\t\t<recordname>race.id-00009@*</recordname>\n";
        break;
      case "Tiefling":
        isTiefling = true;
        buildXML += "\t\t\t<recordname>race.id-00010@*</recordname>\n";
        break;
      default:
    }
    buildXML +=
      '\t\t\t</racelink>\n\t\t<raceversion type="string">2024</raceversion>\n';
  }

  // Get starting class ID
  $.each(
    character.classes,
    function (startingClassKey01, startingClassValue01) {
      if (startingClassValue01.isStartingClass == true) {
        $.each(
          startingClassValue01.definition.classFeatures,
          function (startingClassKey02, startingClassValue02) {
            if (
              startingClassValue02.name ==
              "Core " + startingClassValue01.definition.name + " Traits"
            ) {
              startingClassID = startingClassValue02.id;
            }
          }
        );
      }
    }
  );

  // Characters name
  if (character.name != null)
    buildXML += '\t\t<name type="string">' + character.name + "</name>\n";
  if (character.name != "" || character.name != null) {
    pcFilename = character.name.replace(/\W/g, "");
  }
  if (character.gender != null)
    buildXML += '\t\t<gender type="string">' + character.gender + "</gender>\n";
  if (character.age != null)
    buildXML += '\t\t<age type="string">' + character.age + "</age>\n";
  if (character.faith != null)
    buildXML += '\t\t<deity type="string">' + character.faith + "</deity>\n";
  if (character.height != null)
    buildXML += '\t\t<height type="string">' + character.height + "</height>\n";
  if (character.weight != null)
    buildXML += '\t\t<weight type="string">' + character.weight + "</weight>\n";

  switch (character.alignmentId) {
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

  buildXML += '\t\t<alignment type="string">' + charAlign + "</alignment>\n";

  // Proficiency Bonus
  switch (totalClassLevels) {
    case 1:
    case 2:
    case 3:
    case 4:
      buildXML += '\t\t<profbonus type="number">2</profbonus>\n';
      proficiencyBonus = 2;
      break;
    case 5:
    case 6:
    case 7:
    case 8:
      buildXML += '\t\t<profbonus type="number">3</profbonus>\n';
      proficiencyBonus = 3;
      break;
    case 9:
    case 10:
    case 11:
    case 12:
      buildXML += '\t\t<profbonus type="number">4</profbonus>\n';
      proficiencyBonus = 4;
      break;
    case 13:
    case 14:
    case 15:
    case 16:
      buildXML += '\t\t<profbonus type="number">5</profbonus>\n';
      proficiencyBonus = 5;
      break;
    case 17:
    case 18:
    case 19:
    case 20:
      buildXML += '\t\t<profbonus type="number">6</profbonus>\n';
      proficiencyBonus = 6;
      break;
    default:
      buildXML += '\t\t<profbonus type="number">0</profbonus>\n';
      proficiencyBonus = 0;
  }

  // ABILITY SCORES
  buildXML += "\t\t<abilities>\n";
  abilitiesList.some(function (eachAbility, x) {
    abilityScore = parseInt(getTotalAbilityScore(character, x + 1));
    //console.log(eachAbility + ": " + abilityScore);
    modifierScore = Math.floor(abilityScore / 2 - 5);
    switch (eachAbility) {
      case "strength":
        strengthScore = abilityScore;
        strengthModifier = modifierScore;
        break;
      case "dexterity":
        dexterityScore = abilityScore;
        dexterityModifier = modifierScore;
        break;
      case "constitution":
        constitutionScore = abilityScore;
        constitutionModifier = modifierScore;
        break;
      case "intelligence":
        intelligenceScore = abilityScore;
        intelligenceModifier = modifierScore;
        break;
      case "wisdom":
        wisdomScore = abilityScore;
        wisdomModifier = modifierScore;
        break;
      case "charisma":
        charismaScore = abilityScore;
        charismaModifier = modifierScore;
        break;
      default:
    }

    buildXML += "\t\t\t<" + eachAbility + ">\n";
    buildXML += '\t\t\t\t<bonus type="number">' + modifierScore + "</bonus>\n";
    buildXML += '\t\t\t\t<savemodifier type="number">0</savemodifier>\n';
    character.modifiers.class.some(function (thisModifier) {
      if (
        thisModifier.subType == eachAbility + "-saving-throws" &&
        thisModifier.type == "proficiency"
      ) {
        if (thisModifier.componentId == startingClassID) {
          buildXML += '\t\t\t\t<saveprof type="number">1</saveprof>\n';
          buildXML +=
            '\t\t\t\t<save type="number">' +
            (parseInt(modifierScore) + parseInt(proficiencyBonus)) +
            "</save>\n";
          eval(eachAbility + "Proficiency = 1;");
        }
      }
    });
    if (eval(eachAbility + "Proficiency") != 1) {
      buildXML += '\t\t\t\t<saveprof type="number">0</saveprof>\n';
      buildXML += '\t\t\t\t<save type="number">' + modifierScore + "</save>\n";
    }
    buildXML += '\t\t\t\t<score type="number">' + abilityScore + "</score>\n";
    buildXML += "\t\t\t</" + eachAbility + ">\n";
  });
  buildXML += "\t\t</abilities>\n";

  // SKills List
  var skillCount = 1;
  buildXML += "\t\t<skilllist>\n";
  skillsList.some(function (eachSkill) {
    profValue = 0;
    thisIteration = pad(skillCount, 5);
    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
    buildXML += '\t\t\t\t<misc type="number">0</misc>\n';
    if (eachSkill.match(/^sleight/)) {
      buildXML += '\t\t\t\t<name type="string">Sleight of Hand</name>\n';
    } else if (eachSkill.match(/animal/)) {
      buildXML += '\t\t\t\t<name type="string">Animal Handling</name>\n';
    } else {
      buildXML +=
        '\t\t\t\t<name type="string">' +
        capitalizeFirstLetter(eachSkill) +
        "</name>\n";
    }
    buildXML +=
      '\t\t\t\t<stat type="string">' +
      skillsReference[skillCount - 1] +
      "</stat>\n";

    $.each(character.modifiers.race, function (raceKey, raceValue) {
      if (raceValue.type == "proficiency") {
        if (skillsList.includes(raceValue.subType)) {
          skillsMap[raceValue.subType] = 1;
        } else if (raceValue.subType == "animal-handling") {
          skillsMap["animal_handling"] = 1;
        } else if (raceValue.subType == "sleight-of-hand") {
          skillsMap["sleight_of_hand"] = 1;
        }
      }
    });
    $.each(character.modifiers.class, function (classKey, classValue) {
      if (classValue.type == "proficiency") {
        if (skillsList.includes(classValue.subType)) {
          skillsMap[classValue.subType] = 1;
        } else if (classValue.subType == "animal-handling") {
          skillsMap["animal_handling"] = 1;
        } else if (classValue.subType == "sleight-of-hand") {
          skillsMap["sleight_of_hand"] = 1;
        }
      }
    });
    $.each(
      character.modifiers.background,
      function (backgroundKey, backgroundValue) {
        if (backgroundValue.type == "proficiency") {
          if (skillsList.includes(backgroundValue.subType)) {
            skillsMap[backgroundValue.subType] = 1;
          } else if (backgroundValue.subType == "animal-handling") {
            skillsMap["animal_handling"] = 1;
          } else if (backgroundValue.subType == "sleight-of-hand") {
            skillsMap["sleight_of_hand"] = 1;
          }
        }
      }
    );

    $.each(character.modifiers.feat, function (featKey, featValue) {
      if (featValue.type == "proficiency") {
        if (skillsList.includes(featValue.subType)) {
          skillsMap[featValue.subType] = 1;
        } else if (featValue.subType == "animal-handling") {
          skillsMap["animal_handling"] = 1;
        } else if (featValue.subType == "sleight-of-hand") {
          skillsMap["sleight_of_hand"] = 1;
        }
      }
    });
    buildXML +=
      '\t\t\t\t<prof type="number">' + skillsMap[eachSkill] + "</prof>\n";
    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    skillCount += 1;
  });
  buildXML += "\t\t</skilllist>\n";

  /* HIT POINTS */
  // 1 = Fixed, 2 = Manual

  if (character.preferences.hitPointType == "2") {
    totalHP =
      character.baseHitPoints +
      Math.floor((getTotalAbilityScore(character, 3) - 10) / 2) *
        totalClassLevels;
  } else {
    totalHP =
      sumHP +
      Math.floor((getTotalAbilityScore(character, 3) - 10) / 2) *
        totalClassLevels;
  }

  if (isOriginTough == true) {
    totalHP += 2;
  }

  buildXML += "\t\t<hp>\n";
  if (character.deathSaves.failCount != null) {
    buildXML +=
      '\t\t\t<deathsavefail type="number">' +
      character.deathSaves.failCount +
      "</deathsavefail>\n";
  } else {
    buildXML += '\t\t\t<deathsavefail type="number">0</deathsavefail>\n';
  }
  if (character.deathSaves.successCount != null) {
    buildXML +=
      '\t\t\t<deathsavesuccess type="number">' +
      character.deathSaves.successCount +
      "</deathsavesuccess>\n";
  } else {
    buildXML += '\t\t\t<deathsavesuccess type="number">0</deathsavesuccess>\n';
  }
  buildXML += '\t\t\t<total type="number">' + totalHP + "</total>\n";
  buildXML += "\t\t</hp>\n";

  character.race.racialTraits.some(function (racial_trait, i) {
    if (
      racial_trait.definition.name == "Fleet of Foot" ||
      racial_trait.definition.name == "Swift"
    ) {
      addSpeed += 5;
    }
    if (racial_trait.definition.name == "Size") {
      // Let's figure out the characters size, it's a string: "Your size is XX."
      if (racial_trait.definition.snippet.includes("Small")) {
        buildXML += '\t\t<size type="string">Small</size>\n';
      } else if (racial_trait.definition.snippet.includes("Medium")) {
        buildXML += '\t\t<size type="string">Medium</size>\n';
      } else if (racial_trait.definition.snippet.includes("Large")) {
        buildXML += '\t\t<size type="string">Large</size>\n';
      } else {
        buildXML += '\t\t<size type="string">Unknown</size>\n';
      }
      
    }
  });
  walkSpeed = parseInt(character.race.weightSpeeds.normal.walk) + addSpeed;
  buildXML += "\t\t<speed>\n";
  buildXML += '\t\t\t<base type="number">' + parseInt(walkSpeed) + "</base>\n";
  buildXML +=
    '\t\t\t<total type="number">' + parseInt(walkSpeed) + "</total>\n";
  buildXML += "\t\t</speed>\n";

  /* * * * Start of Inventory * * * */
  buildXML += "\t\t<inventorylist>\n";
  const inventory = character.inventory;

  // Container, such as backpack or bag of holding
  const map1 = new Map();
  if (inventory != null)
    inventory.some(function (container, i) {
      if (container.definition.isContainer == true) {
        map1.set(container.id, container.definition.name);
      }
    });
  //console.log(map1);
  //map1.forEach((values, keys) => {
  //  if (keys == item.containerEntityId) {
  //    buildXML += '\t\t\t\t<location type="string">' + values + "</location>\n";
  //  }
  //});
  //buildXML += "\t\t</inventorylist>\n";

  if (inventory != null)
    inventory.some(function (item, i) {
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
      buildXML +=
        '\t\t\t\t<count type="number">' +
        parseInt(item.quantity) +
        "</count>\n";
      buildXML +=
        '\t\t\t\t<name type="string">' +
        fixQuote(item.definition.name) +
        "</name>\n";
      buildXML +=
        '\t\t\t\t<weight type="number">' +
        parseInt(item.definition.weight) /
          parseInt(item.definition.bundleSize) +
        "</weight>\n";
      buildXML += '\t\t\t\t<locked type="number">1</locked>\n';
      buildXML += '\t\t\t\t<isidentified type="number">1</isidentified>\n';

      map1.forEach((values, keys) => {
        if (keys == item.containerEntityId) {
          buildXML +=
            '\t\t\t\t<location type="string">' + values + "</location>\n";
        }
      });

      if (item.definition.subType == null) {
        buildXML +=
          '\t\t\t\t<type type="string">' +
          fixQuote(item.definition.filterType) +
          "</type>\n";
        if (item.definition.filterType == "Armor") {
          if (item.definition.type != null || item.definition.type != "") {
            buildXML +=
              '\t\t\t\t<subtype type="string">' +
              fixQuote(item.definition.type) +
              "</subtype>\n";
            buildXML +=
              '\t\t\t\t<ac type="number">' +
              item.definition.armorClass +
              "</ac>\n";
          }
          if (item.definition.stealthCheck != null) {
            if (item.definition.stealthCheck == 2) {
              buildXML +=
                '\t\t\t\t<stealth type="string">Disadvantage</stealth>\n';
            } else {
              buildXML += '\t\t\t\t<stealth type="string">-</stealth>\n';
            }
          }
          if (item.definition.strengthRequirement != null) {
            buildXML +=
              '\t\t\t\t<strength type="string">Str ' +
              item.definition.strengthRequirement +
              "</strength>\n";
          } else {
            buildXML += '\t\t\t\t<strength type="string">-</strength>\n';
          }
        }
      } else {
        buildXML +=
          '\t\t\t\t<type type="string">' +
          fixQuote(item.definition.subType) +
          "</type>\n";
      }
      if (item.definition.cost == null) {
        buildXML += '\t\t\t\t<cost type="string"></cost>\n';
      } else {
        buildXML +=
          '\t\t\t\t<cost type="string">' +
          item.definition.cost +
          " gp" +
          "</cost>\n";
      }

      if (item.definition.canAttune == true) {
        buildXML +=
          '\t\t\t\t<rarity type="string">' +
          item.definition.rarity +
          " (Requires Attunement)</rarity>\n";
      } else {
        buildXML +=
          '\t\t\t\t<rarity type="string">' +
          item.definition.rarity +
          "</rarity>\n";
      }
      if (item.equipped == true) {
        buildXML += '\t\t\t\t<carried type="number">2</carried>\n';
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
        buildXML += '\t\t\t\t<carried type="number">1</carried>\n';
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

        buildXML +=
          '\t\t\t\t<damage type="string">' +
          thisDamage +
          " " +
          thisDamType +
          "</damage>\n";
        thisProperties = "";
        item.definition.properties.some(function (weapProp, i) {
          if (weapProp.name == "Ammunition") {
            thisProperties +=
              "Ammunition (" +
              item.definition.range +
              "/" +
              item.definition.longRange +
              "), ";
          } else if (weapProp.name == "Thrown") {
            thisProperties +=
              "Thrown (" +
              item.definition.range +
              "/" +
              item.definition.longRange +
              "), ";
          } else {
            thisProperties += weapProp.name + ", ";
          }
        });
        thisProperties = thisProperties.trim().slice(0, -1);
        buildXML +=
          '\t\t\t\t<properties type="string">' +
          thisProperties +
          "</properties>\n";

        // Get bonus for weapon, but this is only for Inventory, need to fix attacks
        for (d = 0; d <= item.definition.grantedModifiers.length - 1; d++) {
          if (
            item.definition.grantedModifiers[d].type == "bonus" &&
            item.equipped == true
          ) {
            if (item.isAttuned == true && item.definition.canAttune == true) {
              buildXML +=
                '\t\t\t\t<bonus type="number">' +
                item.definition.grantedModifiers[0].value +
                "</bonus>\n";
            } else if (item.definition.canAttune == false) {
              buildXML +=
                '\t\t\t\t<bonus type="number">' +
                item.definition.grantedModifiers[0].value +
                "</bonus>\n";
            }
          }
        }

        weaponID.push(i + 1);
        weaponName.push(item.definition.name);
        weaponProperties.push(thisProperties);
        if (thisProperties.includes("Finesse")) {
          if (strengthScore >= dexterityScore) {
            weaponBase.push("strength");
          } else {
            weaponBase.push("dexterity");
          }
        } else if (thisProperties.includes("Range")) {
          weaponBase.push("dexterity");
        } else {
          weaponBase.push("base");
        }

        curWeapBon = 0;

        if (item.hasOwnProperty("canAttune")) {
          if (item.isAttuned == true && item.definition.canAttune == true) {
            for (
              d = 0;
              d <= item.definition.grantedModifiers.length - 1;
              d++
            ) {
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
          weaponDice.push(
            item.definition.damage.diceCount +
              "d" +
              item.definition.damage.diceValue
          );
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

          buildXML +=
            '\t\t\t\t<damage type="string">' +
            thisDamage +
            " " +
            thisDamType +
            "</damage>\n";
          thisProperties = "";
          item.definition.weaponBehaviors[0].properties.some(function (
            weapProp
          ) {
            if (weapProp.name == "Ammunition") {
              thisProperties +=
                "Ammunition (" +
                item.definition.range +
                "/" +
                item.definition.longRange +
                "), ";
            } else {
              if (weapProp.hasOwnProperty("notes")) {
                if (
                  weapProp.notes != "" &&
                  weapProp.notes != undefined &&
                  weapProp != null
                ) {
                  thisProperties +=
                    weapProp.name + "(" + weapProp.notes + "), ";
                } else {
                  thisProperties += weapProp.name + ", ";
                }
              }
            }
          });
          thisProperties = thisProperties.trim().slice(0, -1);
          buildXML +=
            '\t\t\t\t<properties type="string">' +
            thisProperties +
            "</properties>\n";

          weaponID.push(i + 1);
          weaponName.push(item.definition.name);
          weaponProperties.push(thisProperties);
          if (item.definition.weaponBehaviors[0].damage != null) {
            weaponDice.push(
              "d" + item.definition.weaponBehaviors[0].damage.diceValue
            );
            weaponDiceMult.push(
              item.definition.weaponBehaviors[0].damage.diceCount
            );
          } else {
            weaponDice.push("d0");
            weaponDiceMult.push("0");
          }
          if (item.definition.weaponBehaviors[0].damageType != null) {
            weaponType.push(
              item.definition.weaponBehaviors[0].damageType.toLowerCase()
            );
          } else {
            weaponType.push("");
          }
          item.definition.grantedModifiers.some(function (doMods) {
            if (doMods.type == "bonus") {
              weaponBonus.push(doMods.value);
              buildXML +=
                '\t\t\t\t<bonus type="number">' + doMods.value + "</bonus>\n";
            }
          });
        } else {
          // This item has weapon properties, but the length is 0
          if (item.definition.hasOwnProperty("grantedModifiers")) {
            if (item.definition.grantedModifiers.length > 0) {
              for (
                l = 0;
                l <= item.definition.grantedModifiers.length - 1;
                l++
              ) {
                if (
                  item.definition.grantedModifiers[l].subType ==
                    "armor-class" &&
                  item.equipped == true &&
                  item.definition.grantedModifiers[l].type == "bonus"
                ) {
                  addBonusOtherAC +=
                    item.definition.grantedModifiers[l].value;
                }
                if (
                  item.definition.grantedModifiers[l].subType ==
                    "saving-throws" &&
                  item.equipped == true &&
                  item.definition.grantedModifiers[l].type == "bonus"
                ) {
                  addSavingThrows +=
                    item.definition.grantedModifiers[l].value;
                }
              }
            }
          }
        }
      } else {
        // Item does not have weaponBehaviors
        if (item.definition.hasOwnProperty("grantedModifiers")) {
          for (m = 0; m <= item.definition.grantedModifiers.length - 1; m++) {
            if (
              item.definition.grantedModifiers[m].subType == "armor-class" &&
              item.equipped == true &&
              item.definition.grantedModifiers[m].type == "bonus"
            ) {
              addBonusArmorAC += item.definition.grantedModifiers[m].value;
            }
            if (
              item.definition.grantedModifiers[m].subType ==
                "saving-throws" &&
              item.equipped == true &&
              item.definition.grantedModifiers[m].type == "bonus"
            ) {
              addSavingThrows += item.definition.grantedModifiers[m].value;
            }
          }
        }
      }

      buildXML += '\t\t\t\t<description type="formattedtext">\n';
      buildXML += "\t\t\t\t\t" + fixDesc(item.definition.description) + "\n";
      buildXML += "\t\t\t\t</description>\n";
      thisWeaponName = item.definition.name
        .toLowerCase()
        .replace(/\s/g, "_")
        .replace(/,/g, "");
      if (simpleRangedWeapon.indexOf(thisWeaponName) != -1) {
        buildXML +=
          '\t\t\t\t<subtype type="string">Simple Ranged Weapon</subtype>\n';
      } else if (simpleMeleeWeapon.indexOf(thisWeaponName) != -1) {
        buildXML +=
          '\t\t\t\t<subtype type="string">Simple Melee Weapon</subtype>\n';
      } else if (martialRangedWeapon.indexOf(thisWeaponName) != -1) {
        buildXML +=
          '\t\t\t\t<subtype type="string">Martial Ranged Weapon</subtype>\n';
      } else if (martialMeleeWeapon.indexOf(thisWeaponName) != -1) {
        buildXML +=
          '\t\t\t\t<subtype type="string">Martial Melee Weapon</subtype>\n';
      }
      buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });
  buildXML += "\t\t</inventorylist>\n";
  /* * * * End of Inventory * * * */

  /* * * * Start of Weaponlist * * * */
  buildXML += "\t\t<weaponlist>\n";
    var weaponCount = 0;
    var thrownCount = 0;
    for (x = 0; x < weaponID.length; x++) {
      weaponCount += 1;
      thisIteration = pad(x + 1, 5);
      inventNum = pad(parseInt(weaponID[x]), 5);
      buildXML += "\t\t\t<id-" + thisIteration + ">\n";
      buildXML += '\t\t\t\t<shortcut type="windowreference">\n';
      buildXML += "\t\t\t\t\t<class>item</class>\n";
      buildXML +=
        "\t\t\t\t\t<recordname>....inventorylist.id-" +
        inventNum +
        "</recordname>\n";
      buildXML += "\t\t\t\t</shortcut>\n";
      buildXML += '\t\t\t\t<name type="string">' + weaponName[x] + "</name>\n";
      buildXML +=
        '\t\t\t\t<properties type="string">' +
        weaponProperties[x] +
        "</properties>\n";
      buildXML += "\t\t\t\t<damagelist>\n";
      buildXML += "\t\t\t\t\t<id-00001>\n";
      buildXML +=
        '\t\t\t\t\t\t<bonus type="number">' + weaponBonus[x] + "</bonus>\n";
      buildXML +=
        '\t\t\t\t\t\t<dice type="dice">' + weaponDice[x] + "</dice>\n";
      buildXML +=
        '\t\t\t\t\t\t<stat type="string">' + weaponBase[x] + "</stat>\n";
      buildXML +=
        '\t\t\t\t\t\t<type type="string">' + weaponType[x] + "</type>\n";
      buildXML += "\t\t\t\t\t</id-00001>\n";
      buildXML += "\t\t\t\t</damagelist>\n";
      if (weaponName[x].includes("Crossbow")) {
        buildXML +=
          '\t\t\t\t<maxammo type="number">' + numBolts + "</maxammo>\n";
      } else if (weaponName[x].includes("Sling")) {
        buildXML +=
          '\t\t\t\t<maxammo type="number">' + numBullets + "</maxammo>\n";
      } else if (weaponName[x].includes("Blowgun")) {
        buildXML +=
          '\t\t\t\t<maxammo type="number">' + numNeedles + "</maxammo>\n";
      } else if (
        weaponName[x].includes("Shortbow") ||
        weaponName[x].includes("Longbow")
      ) {
        buildXML +=
          '\t\t\t\t<maxammo type="number">' + numArrows + "</maxammo>\n";
      }
      buildXML +=
        '\t\t\t\t<attackbonus type="number">' +
        weaponBonus[x] +
        "</attackbonus>\n";
      buildXML +=
        '\t\t\t\t<attackstat type="string">' +
        weaponBase[x] +
        "</attackstat>\n";
      buildXML += '\t\t\t\t<isidentified type="number">1</isidentified>\n';
      // 0: Melee, 1: Ranged, 2: Thrown
      if (weaponProperties[x].match(/Thrown/)) {
        buildXML += '\t\t\t\t<type type="number">2</type>\n';
      } else if (weaponProperties[x].match(/Range/)) {
        buildXML += '\t\t\t\t<type type="number">1</type>\n';
      } else {
        buildXML += '\t\t\t\t<type type="number">0</type>\n';
      }

      buildXML += "\t\t\t</id-" + thisIteration + ">\n";
      if (weaponProperties[x].includes("Thrown")) {
        thrownCount += 1;
        weaponCount += 1;
        thisIteration = pad(weaponID.length + thrownCount, 5);
        // We need to add these to the end, providing a higher weaponID.length
        inventNum = pad(parseInt(weaponID[x]), 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += '\t\t\t\t<shortcut type="windowreference">\n';
        buildXML += "\t\t\t\t\t<class>item</class>\n";
        buildXML +=
          "\t\t\t\t\t<recordname>....inventorylist.id-" +
          inventNum +
          "</recordname>\n";
        buildXML += "\t\t\t\t</shortcut>\n";
        buildXML +=
          '\t\t\t\t<name type="string">' + weaponName[x] + "</name>\n";
        buildXML +=
          '\t\t\t\t<properties type="string">' +
          weaponProperties[x] +
          "</properties>\n";
        buildXML += "\t\t\t\t<damagelist>\n";
        buildXML += "\t\t\t\t\t<id-00001>\n";
        buildXML +=
          '\t\t\t\t\t\t<bonus type="number">' + weaponBonus[x] + "</bonus>\n";
        buildXML +=
          '\t\t\t\t\t\t<dice type="dice">' + weaponDice[x] + "</dice>\n";
        buildXML +=
          '\t\t\t\t\t\t<stat type="string">' + weaponBase[x] + "</stat>\n";
        buildXML +=
          '\t\t\t\t\t\t<type type="string">' + weaponType[x] + "</type>\n";
        buildXML += "\t\t\t\t\t</id-00001>\n";
        buildXML += "\t\t\t\t</damagelist>\n";
        buildXML +=
          '\t\t\t\t<attackbonus type="number">' +
          weaponBonus[x] +
          "</attackbonus>\n";
        buildXML +=
          '\t\t\t\t<attackstat type="string">' +
          weaponBase[x] +
          "</attackstat>\n";
        buildXML += '\t\t\t\t<isidentified type="number">1</isidentified>\n';
        buildXML += '\t\t\t\t<type type="number">0</type>\n';
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
      }
    }
    if (isMonk == 1) {
      weaponCount += 1;
      thisIteration = pad(weaponCount + 1, 5);
      buildXML += "\t\t\t<id-" + thisIteration + ">\n";
      buildXML += addMonkUnarmedStrike;
      buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    }
    buildXML += "\t\t</weaponlist>\n";
    /* * * * * End of Weaponlist * * * * */

    if (character.traits.personalityTraits != null) {
      buildXML +=
        '\t\t<personalitytraits type="string">' +
        fixQuote(character.traits.personalityTraits) +
        "</personalitytraits>\n";
    }
    if (character.traits.ideals != null) {
      buildXML +=
        '\t\t<ideals type="string">' +
        fixQuote(character.traits.ideals) +
        "</ideals>\n";
    }
    if (character.traits.bonds != null) {
      buildXML +=
        '\t\t<bonds type="string">' +
        fixQuote(character.traits.bonds) +
        "</bonds>\n";
    }
    if (character.traits.flaws != null) {
      buildXML +=
        '\t\t<flaws type="string">' +
        fixQuote(character.traits.flaws) +
        "</flaws>\n";
    }

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
      buildXML +=
        '\t\t<appearance type="string">Eyes: ' +
        fixQuote(character.eyes) +
        "</appearance>\n";
    } else if (hasAppear == 2) {
      buildXML +=
        '\t\t<appearance type="string">Hair: ' +
        fixQuote(character.hair) +
        "</appearance>\n";
    } else if (hasAppear == 3) {
      buildXML +=
        '\t\t<appearance type="string">Eyes: ' +
        fixQuote(character.eyes) +
        "\nHair: " +
        fixQuote(character.hair) +
        "</appearance>\n";
    } else if (hasAppear == 4) {
      buildXML +=
        '\t\t<appearance type="string">Skin: ' +
        fixQuote(character.skin) +
        "</appearance>\n";
    } else if (hasAppear == 5) {
      buildXML +=
        '\t\t<appearance type="string">Eyes: ' +
        fixQuote(character.eyes) +
        "\nSkin: " +
        fixQuote(character.skin) +
        "</appearance>\n";
    } else if (hasAppear == 6) {
      buildXML +=
        '\t\t<appearance type="string">Hair: ' +
        fixQuote(character.hair) +
        "\nSkin: " +
        fixQuote(character.skin) +
        "</appearance>\n";
    } else if (hasAppear == 7) {
      buildXML +=
        '\t\t<appearance type="string">Eyes: ' +
        fixQuote(character.eyes) +
        "\nHair: " +
        fixQuote(character.hair) +
        "\nSkin: " +
        fixQuote(character.skin) +
        "</appearance>\n";
    }

  allXML = startXML + buildXML + endXML;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(allXML, "text/xml");
  $("#textHere").val(allXML);
}

const getTotalAbilityScore = function (character, scoreId) {
  var index = scoreId - 1;
  var base =
      character.stats[index].value == null ? 10 : character.stats[index].value,
    bonus =
      character.bonusStats[index].value == null
        ? 0
        : character.bonusStats[index].value,
    override =
      character.overrideStats[index].value == null
        ? 0
        : character.overrideStats[index].value,
    total = base + bonus;
  $.each(character.modifiers.feat, function (featKey, featValue) {
    if (featValue.entityId == scoreId && featValue.type == "bonus") {
      total += featValue.value;
    }
  });
  if (override > 0) total = override;

  if (total > 20) {
    total = 20;
  }
  return total;
};

var dispLinks = (function () {
  function _createLinks() {
    var userLinks = $("#displayLinks");
    var offset = userLinks.offset();
    $("#Linkwindow").jqxWindow({
      position: {
        x: 150,
        y: 150,
      },
      theme: "orange",
      isModal: true,
      showCollapseButton: true,
      maxHeight: 400,
      maxWidth: 700,
      minHeight: 200,
      minWidth: 200,
      height: 300,
      width: 500,
      initContent: function () {
        $("#Linkwindow").jqxWindow("focus");
      },
    });
  }
  return {
    config: {
      dragArea: null,
    },
    init: function () {
      _createLinks();
    },
  };
})();

var clLinks = (function () {
  function _createCL() {
    var userCL = $("#displayCL");
    var offset = userCL.offset();
    $("#CLwindow").jqxWindow({
      position: {
        x: 150,
        y: 50,
      },
      theme: "orange",
      showCollapseButton: true,
      maxWidth: 700,
      minWidth: 200,
      height: 450,
      width: 500,
      resizable: true,
      isModal: true,
      initContent: function () {
        $("#CLwindow").jqxWindow("focus");
      },
    });
  }
  return {
    config: {
      dragArea: null,
    },
    init: function () {
      _createCL();
    },
  };
})();

var donateFGC = (function () {
  function _createDon() {
    var userDon = $("#displayDon");
    var offset = userDon.offset();
    $("#DONwindow").jqxWindow({
      position: {
        x: 150,
        y: 150,
      },
      theme: "orange",
      isModal: true,
      showCollapseButton: true,
      maxHeight: 400,
      maxWidth: 700,
      minHeight: 200,
      minWidth: 200,
      height: 300,
      width: 500,
      initContent: function () {
        $("#DONwindow").jqxWindow("focus");
      },
    });
  }
  return {
    config: {
      dragArea: null,
    },
    init: function () {
      _createDon();
    },
  };
})();

function pad(num, size) {
  var s = num + "";

  while (s.length < size) s = "0" + s;
  return s;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//const getObjects = function(obj, key, val) {
//    var objects = [];
//    for (var i in obj) {
//        //console.log(i);
//        if (!obj.hasOwnProperty(i)) continue;
//        if (typeof obj[i] == 'object') {
//            objects = objects.concat(getObjects(obj[i], key, val));
//        } else if (i == key && obj[i] == val || i == key && val == '') {
//            objects.push(obj);
//        } else if (obj[i] == val && key == '') {
//            if (objects.lastIndexOf(obj) == -1) {
//                objects.push(obj);
//            }
//        }
//    }
//    return objects;
//};

function invokeSaveAsDialog(file, fileName) {
  if (!file) {
    throw "Blob object is required.";
  }

  if (!file.type) {
    file.type = "video/webm";
  }

  var fileExtension = file.type.split("/")[1];

  if (fileName && fileName.indexOf(".") !== -1) {
    var splitted = fileName.split(".");
    fileName = splitted[0];
    fileExtension = splitted[1];
  }

  var fileFullName =
    (fileName || Math.round(Math.random() * 9999999999) + 888888888) +
    "." +
    fileExtension;

  if (typeof navigator.msSaveOrOpenBlob !== "undefined") {
    return navigator.msSaveOrOpenBlob(file, fileFullName);
  } else if (typeof navigator.msSaveBlob !== "undefined") {
    return navigator.msSaveBlob(file, fileFullName);
  }

  var hyperlink = document.createElement("a");
  hyperlink.href = URL.createObjectURL(file);
  hyperlink.target = "_blank";
  hyperlink.download = fileFullName;

  if (!!navigator.mozGetUserMedia) {
    hyperlink.onclick = function () {
      (document.body || document.documentElement).removeChild(hyperlink);
    };
    (document.body || document.documentElement).appendChild(hyperlink);
  }

  var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  hyperlink.dispatchEvent(evt);

  if (!navigator.mozGetUserMedia) {
    URL.revokeObjectURL(hyperlink.href);
  }
}

function fixQuote(badString) {
    if (badString == "" || badString == null) {
      return "";
    }
    return badString
      .replace(/\n/g, "\n")
      .replace(/\u2019/g, "'")
      .replace(/\u2014/g, "-")
      .replace(/"/g, "&#34;")
      .replace(/\u2022/g, ":")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&nbsp;/g, " ")
      .replace(/&rsquo;/g, "'")
      .replace(/\s&/g, "&amp;")
      .trim();
}

function fixDesc(badString) {
    if (badString == "" || badString == null) {
      return "";
    }
    var tempString1 = badString
      .replace(/<a\s.*?\">/g, "")
      .replace(/<\/a>/g, "")
      .replace(/<\/span>/g, "");
    var tempString2 = tempString1
      .replace(/<img.*?">/g, "")
      .replace(/<hr>/g, "<hr />")
      .replace(/<span>/g, "");
    var tempString3 = tempString2
      .replace(/<br>/g, "<br />")
      .replace(/&rsquo;/g, "'")
      .replace(/&nbsp;/g, " ");
    var tempString4 = tempString3
      .replace(/&ldquo;/g, '"')
      .replace(/<span\s.*?">/g, "")
      .replace(/<em>/g, "")
      .replace(/<\/em>/g, "");
    var tempString5 = tempString4
      .replace(/&ndash;/g, "-")
      .replace(/&lsquo;/g, "'");
    return tempString5
      .replace(/&rdquo;/g, '"')
      .replace(/&mdash;/g, "-")
      .replace(/&times;/g, "*")
      .replace(/&minus;/g, "-")
      .replace(/&hellip;/g, "...")
      .trim();
}
