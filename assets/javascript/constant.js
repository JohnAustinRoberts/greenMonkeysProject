
var ingredients = {
"beef" : ["cabernet", "pinot noir", "merlot", "chianti", "malbec"],
"steak" : ["petit sirah", "cabernet", "pinot noir", "chianti"],
"burger" : ["pinot nero", "malbec", "zinfindel", "cotes du rhone"],
"kabob" : ["chardonnay", "pinot gris", "dry riesling", "valpolicella", "pinot nero"],
"chicken" : ["chardonnay", "pinot grigio", "pinot nero", "riesling", "suavignon blanc", "zinfindel"],
"pork" : ["chianti", "valpolicella", "rose", "zinfindel", "pinotage", "merlot"],
"duck" : ["beaujolais", "pinot noir", "malbec", "petit sirah", "barolo", "brunello"],
"salmon" : ["chardonnay", "pinot grigio", "suavignon blanc"],
"tilapia" : ["white zinfindel", "riesling", "prosecco"],
"cod" : ["pinot grigio", "fiano", "greco", "pinot bianco"],
"tuna" : ["chardonnay", "pinot bianco", "suavignon blanc"],
"fish" : ["chardonnay", "pinot grigio", "riesling", "suavignon blanc"],
"shrimp" : ["pinot grigio", "riesling", "pinot nero", "french burgandy"],
"lobster" : ["light merlot", "french burgandy", "white burgandy", "suavignon blanc"],
"crab" : ["dry riesling", "buttery chardonnay", "rose grenache"],
"alligator" :["california cabernet", "bordeaux", "riesling"],
"venison" : ["cabernet", "petit sirah", "merlot"],
"deer" : ["cabernet", "petit sirah", "merlot"],
"vegetarian" : ["pinot noir", "sirah", "pinot nero"],
"default" : ["chardonnay", "pinor noir", "merlot", "malbec", "riesling", "valpolicella"]
};
/*
var varietals = {
  "cabernet": ["beef", "steak", "venison", "deer"],
  "pinot noir": ["beef", "steak", "duck"],
  "merlot": ["beef", "pork", "deer", "venison"],
  "chianti": ["beef", "steak", "pork"],
  "malbec": ["burger", "duck"],
  "petit sirah": ["steak", "deer", "vegetarian"],
  "sirah": ["vegetarian"],
  "pinot nero": ["burger", "kabob", "chicken", "shrimp", "vegetarian"],
  "zinfindel": ["chicken", "tilapia"],
  "cotes du rhone": ["burger"],
  "chardonnay": ["kabob", "chicken", "salmon", "tuna", "fish", "crab", "shrimp"],
  "pinot grigio": ["chicken", "salmon", "fish"],
  "pinot gris": ["chicken", "salmon", "tilapia", "crab"],
  "dry riesling": ["crab", "alligator"],
  "valpolicella": ["beef", "steak"],
  "suavignon blanc": ["lobster", "crab", "chicken", "salmon", "tuna"],
  "rose": ["tilapia", "salmon", "shrimp"],
  "pinotage": ["pork", "chicken"],
  "beujolais": ["beef", "alligator"],
  "barolo": ["steak", "beef", "venison", "duck"],
  "brunello": ["steak", "beef", "venison"],
  "white zinfindel": ["tilapia", "chicken"],
  "riesling": ["alligator", "tilapia", "chicken"],
  "prosecco": ["shrimp", "tilapia"],
  "french burgandy": ["alligator", "venison", "beef"],
  "light merlot": ["lobster"],
  "white burgandy": ["lobster", "shrimp", "crab"],
  "california cabernet": ["steak", "beef", "alligator"],
  "bordeaux": ["steak", "beef", "alligator"],
  "buttery chardonnay": ["shrimp", "crab", "lobster"],
  "rose grenache": ["crab", "shrimp", "lobster"]
  "default": ["chicken", "beef", "fish", "pasta"]
}

var varietalInfo = {
  "cabernet": ["Cabernet Sauvignon is one of the world's most widely recognized red wine grape varieties. It is grown in nearly every major wine producing country among a diverse spectrum of climates from Canada's Okanagan Valley to Lebanon's Beqaa Valley. Cabernet Sauvignon became internationally recognized through its prominence in Bordeaux wines where it is often blended with Merlot and Cabernet Franc. The classic profile of Cabernet Sauvignon tends to be full-bodied wines with high tannins and noticeable acidity that contributes to the wine's aging potential. In cooler climates, Cabernet Sauvignon tends to produce wines with blackcurrant notes that can be accompanied by green bell pepper notes, mint and cedar which will all become more pronounced as the wine ages. In more moderate climates the blackcurrant notes are often seen with black cherry and black olive notes while in very hot climates the currant flavors can veer towards the over-ripe and 'jammy' side. In parts of Australia, particularly the Coonawarra wine region of South Australia, Cabernet Sauvignon wines tend to have a characteristic eucalyptus or menthol notes."],
  "pinot noir": ["Pinot noir is a red wine grape variety of the species Vitis vinifera. The name may also refer to wines created predominantly from Pinot noir grapes. The tremendously broad range of bouquets, flavors, textures and impressions that Pinot noir can produce sometimes confuses tasters.[4] In the broadest terms, the wine tends to be of light to medium body with an aroma reminiscent of black and / or red cherry, raspberry and to a lesser extent currant and many other fine small red and black berry fruits."],
  "merlot": ["Merlot is a dark blue-colored wine grape variety, that is used as both a blending grape and for varietal wines. While Merlot is made across the globe, there tends to be two main styles. The 'International style' favored by many New World wine regions tends to emphasize late harvesting to gain physiological ripeness and produce inky, purple colored wines that are full in body with high alcohol and lush, velvety tannins with intense, plum and blackberry fruit. While this international style is practiced by many Bordeaux wine producers, the traditional 'Bordeaux style' of Merlot involves harvesting Merlot earlier to maintain acidity and producing more medium-bodied wines with moderate alcohol levels that have fresh, red fruit flavors (raspberries, strawberries) and potentially leafy, vegetal notes."],
  "chianti": ["A Chianti wine is any wine produced in the Chianti region, in central Tuscany, Italy. For a wine to retain the name of Chianti, it must be produced with at least 80% Sangiovese grapes. Chianti that meets more stringent requirements (lower yield, higher alcohol content and dry extract) may be labelled as Chianti Superiore."],
  "malbec": ["Malbec is a purple grape variety used in making red wine. The grapes tend to have an inky dark color and robust tannins, and are known as one of the six grapes allowed in the blend of red Bordeaux wine Malbec (pronounced: [mal.bɛk]) is a purple grape variety used in making red wine. The grapes tend to have an inky dark color and robust tannins, and are known as one of the six grapes allowed in the blend of red Bordeaux wine."],
  "petit sirah": ["Durif is a variety of red wine grape primarily grown in Australia, California, France, and Israel. Since the end of the 20th century, wineries located in Washington's Yakima River Valley, Maryland, Arizona, West Virginia, Chile, Mexico's Baja California Peninsula, and Ontario's Niagara Peninsula have also produced wines from Durif grapes. It is the main grape known in the U.S. and Israel as Petite Sirah, with over 90% of the California plantings labeled 'Petite Sirah' being Durif grapes; the U.S. Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF) recognizes 'Durif' and 'Petite Sirah' as synonyms for the same grape. It produces tannic wines with a spicy, plummy flavour. The grape originated as a cross of Syrah pollen germinating a Peloursin plant. On some occasions, Peloursin and Syrah vines may be called Petite Sirah, usually because the varieties are extremely difficult to distinguish in old age."],
  "syrah": ["Durif is a variety of red wine grape primarily grown in Australia, California, France, and Israel. Since the end of the 20th century, wineries located in Washington's Yakima River Valley, Maryland, Arizona, West Virginia, Chile, Mexico's Baja California Peninsula, and Ontario's Niagara Peninsula have also produced wines from Durif grapes. It is the main grape known in the U.S. and Israel as Petite Sirah, with over 90% of the California plantings labeled 'Petite Sirah' being Durif grapes; the U.S. Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF) recognizes 'Durif' and 'Petite Sirah' as synonyms for the same grape. It produces tannic wines with a spicy, plummy flavour. The grape originated as a cross of Syrah pollen germinating a Peloursin plant. On some occasions, Peloursin and Syrah vines may be called Petite Sirah, usually because the varieties are extremely difficult to distinguish in old age."],
  "pinot nero": ["The Italian synonym for the great Pinot Noir varietal. Found mainly in the northern reaches of the peninsula, Pinot Nero is usually light and fruity, perhaps closer to a rosé than a red, but rarely in the more powerful and ethereal forms found further to the northwest in Burgundy."],
  "zinfindel": ["Zinfandel (also known as Primitivo) is a variety of black-skinned wine grape. The variety is grown in over 10 percent of California vineyards. The grapes typically produce a robust red wine, although in the United States a semi-sweet rosé (blush-style) wine called White Zinfandel has six times as many sales as the red wine. The grape's high sugar content can be fermented into levels of alcohol exceeding 15 percent."],
  "cotes du rhone": ["Côtes du Rhône (English: Slopes or Hills of the Rhône) is a wine-growing Appellation d'Origine Contrôlée (AOC) for the Rhône wine region of France, which may be used throughout the region. Côtes du Rhône are the basic AOC wines of the Rhône region, and exist as red, white and rosé wines, generally dominated by Grenache (reds and rosés) or Grenache blanc (whites)."],
  "chardonnay": ["Chardonnay is a green-skinned grape variety used in the production of white wine. The Chardonnay grape itself is very neutral, with many of the flavors commonly associated with the grape being derived from such influences as terroir and oak. "],
  "pinot grigio": ["Derived from the pinot gris grape, these wines can range from minerally & dry to fruity & sweet."],
  "pinot gris": ["Pinot gris or Grauburgunder is a white wine grape variety of the species Vitis vinifera. Thought to be a mutant clone of the Pinot noir variety, it normally has a grayish-blue fruit, accounting for its name (gris meaning 'gray' in French) but the grapes can have a brownish pink to black and even white appearance. Pinot gris is grown around the globe with the 'spicy' full-bodied Alsatian and lighter-bodied, more acidic Italian styles being most widely recognized."],
  "dry riesling": ["Riesling is a white grape variety which originated in the Rhine region of Germany. Riesling is an aromatic grape variety displaying flowery, almost perfumed, aromas as well as high acidity. It is used to make dry, semi-sweet, sweet, and sparkling white wines. "],
  "valpolicella": ["Valpolicella is a viticultural zone of the province of Verona, Italy, east of Lake Garda. The hilly agricultural and marble-quarrying region of small holdings north of the Adige is famous for wine production. Valpolicella ranks just after Chianti in total Italian Denominazione di Origine Controllata (DOC) wine production. "],
  "suavignon blanc": ["Sauvignon blanc is a green-skinned grape variety that originates from the Bordeaux region of France. The grape most likely gets its name from the French words sauvage ('wild') and blanc ('white') due to its early origins as an indigenous grape in South West France. Depending on the climate, the flavor can range from aggressively grassy to sweetly tropical. In cooler climates, the grape has a tendency to produce wines with noticeable acidity and 'green flavors' of grass, green bell peppers and nettles with some tropical fruit (such as passion fruit) and floral (such as elderflower) notes. In warmer climates, it can develop more tropical fruit notes but risk losing a lot of aromatics from over-ripeness, leaving only slight grapefruit and tree fruit (such as peach) notes."],
  "rose": ["Rosé wines are made from a wide variety of grapes and can be found all around the globe. When rosé wine is the primary product, it is produced with the skin contact method. Black-skinned grapes are crushed and the skins are allowed to remain in contact with the juice for a short period, typically one to three days."],
  "pinotage": ["Pinotage is a red wine grape that is South Africa's signature variety.  It typically produces deep red varietal wines with smoky, bramble and earthy flavors, sometimes with notes of bananas and tropical fruit, but has been criticized for sometimes smelling of acetone. Pinotage is often blended, and also made into fortified wine and even red sparkling wine."],
  "beujolais": ["Beaujolais is a French Appellation d'Origine Contrôlée (AOC) wine generally made of the Gamay grape which has a thin skin and is low in tannins. Like most AOC wines they are not labeled varietally. "],
  "barolo": ["Barolo is a red Denominazione di Origine Controllata e Garantita (DOCG) wine produced in the northern Italian region of Piedmont. It is made from the Nebbiolo grape and is often described as one of Italy's greatest wines."],
  "brunello": ["An important clone of the Italian Sangiovese found exclusively in the Tuscan town of Montalcino. First cultivated in the 19th century by Ferrucio Biondi Santi, today Brunello di Montalcinos are the greatest expressions of Tuscan Sangiovese. Compared to 'Chianti on steroids,' Brunellos are big, intense, complex and expensive. Highly sought after for both their longevity and consistency Brunellos can age for 20 years or more under the right conditions. The DOCG of Montalcino also has specific standards regarding yield, harvest dates, ageing and quality"],
  "white zinfindel": ["Zinfandel (also known as Primitivo) is a variety of black-skinned wine grape. The variety is grown in over 10 percent of California vineyards. The grapes typically produce a robust red wine, although in the United States a semi-sweet rosé (blush-style) wine called White Zinfandel has six times as many sales as the red wine. The grape's high sugar content can be fermented into levels of alcohol exceeding 15 percent."],
  "riesling": ["Riesling is a white grape variety which originated in the Rhine region of Germany. Riesling is an aromatic grape variety displaying flowery, almost perfumed, aromas as well as high acidity. It is used to make dry, semi-sweet, sweet, and sparkling white wines. "],
  "prosecco": ["Prosecco is an Italian white wine. Prosecco DOC can be spumante ('sparkling wine'), frizzante ('semi-sparkling wine'), or tranquillo ('still wine'), depending on the perlage.[3] It is made from Glera grapes, formerly known also as Prosecco, but other grape varieties may be included. "],
  "french burgandy": ["Burgundy wine is wine made in the Burgundy region in eastern France, in the valleys and slopes west of the Saône, a tributary of the Rhône. The most famous wines produced here—those commonly referred to as 'Burgundies'—are dry red wines made from Pinot noir grapes and white wines made from Chardonnay grapes."],
  "light merlot": ["Merlot is a dark blue-colored wine grape variety, that is used as both a blending grape and for varietal wines. While Merlot is made across the globe, there tends to be two main styles. The 'International style' favored by many New World wine regions tends to emphasize late harvesting to gain physiological ripeness and produce inky, purple colored wines that are full in body with high alcohol and lush, velvety tannins with intense, plum and blackberry fruit. While this international style is practiced by many Bordeaux wine producers, the traditional 'Bordeaux style' of Merlot involves harvesting Merlot earlier to maintain acidity and producing more medium-bodied wines with moderate alcohol levels that have fresh, red fruit flavors (raspberries, strawberries) and potentially leafy, vegetal notes."],
  "white burgandy": ["Burgundy wine is wine made in the Burgundy region in eastern France, in the valleys and slopes west of the Saône, a tributary of the Rhône. The most famous wines produced here—those commonly referred to as 'Burgundies'—are dry red wines made from Pinot noir grapes and white wines made from Chardonnay grapes."],
  "california cabernet": ["Cabernet Sauvignon is one of the world's most widely recognized red wine grape varieties. It is grown in nearly every major wine producing country among a diverse spectrum of climates from Canada's Okanagan Valley to Lebanon's Beqaa Valley. Cabernet Sauvignon became internationally recognized through its prominence in Bordeaux wines where it is often blended with Merlot and Cabernet Franc. The classic profile of Cabernet Sauvignon tends to be full-bodied wines with high tannins and noticeable acidity that contributes to the wine's aging potential."],
  "bordeaux": ["A Bordeaux wine is any wine produced in the Bordeaux region of France, centred on the city of Bordeaux and covering the whole area of the Gironde department, with a total vineyard area of over 120,000 hectares, making it the largest wine growing area in France."],
  "buttery chardonnay": ["Chardonnay is a green-skinned grape variety used in the production of white wine. The Chardonnay grape itself is very neutral, with many of the flavors commonly associated with the grape being derived from such influences as terroir and oak."],
  "rose grenache": ["Grenache or Garnacha is one of the most widely planted red wine grape varieties in the world. It is generally spicy, berry-flavored and soft on the palate and produces wine with a relatively high alcohol content, but it needs careful control of yields for best results. Characteristic flavor profiles on Grenache include red fruit flavors (raspberry and strawberry) with a subtle, white pepper spice note."]
}*/