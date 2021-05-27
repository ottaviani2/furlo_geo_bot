const { Telegraf } = require('telegraf')

const bot = new Telegraf('[TOKEN]', {polling:true})

//SERVER EXPRESS
//const express = require('express');
//const app = express();
//app.use(express.json()); 

var lang = '';

function back_to_menu(ctx){
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'Come back to menu',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'Torna al menu',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
}

function back_to_menu_photo(ctx, num){
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'Options',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Back to description", callback_data: "point"+num}],
                    [{text:"Site Coordinates", callback_data: "cor"+num}],
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'Opzioni',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Torna alla descrizione", callback_data: "point"+num}],
                    [{text:"Coordinate del sito", callback_data: "cor"+num}],
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
};

function back_to_menu_coor(text, ctx, num, name){
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, text,
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Back to description", callback_data: "point"+num}],
                    [{text:"Photo of site", callback_data: name}],
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, text,
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Torna alla descrizione", callback_data: "point"+num}],
                    [{text:"Foto del sito", callback_data: name}],
                    [{text:"Menu", callback_data: "menu"}], 
                ]
            }
        })
    }
};

function eng_menu(ctx){
    ctx.telegram.sendMessage(ctx.chat.id, 'MENU',
    {
        reply_markup: {
            inline_keyboard:[
                [{text:"Furlo Geological Map", callback_data: "map"}], 
                [{text:"Google Earth View", callback_data: "goe"}],
                [{text:"Umbro-Marchigiana Succession Stratigraphic Column", callback_data: "ico"}],
                [{text:"3D Geolgical Section", callback_data: "sec"}],
                [{text:"1 - THE GORGE", callback_data: "point1"}],
                [{text:"2 - GRILLI QUARRY", callback_data: "point2"}],
                [{text:"3 - CARBONATIC TURBIDITES", callback_data: "point3"}],
                [{text:"4 - ACCESS TO THE HIGH QUARRY", callback_data: "point4"}],
                [{text:"5 - SLUMP", callback_data: "point5"}],
                [{text:"6 - OUTCROP SHOWING NORMAL FAULTS", callback_data: "point6"}],
                [{text:"7 - VARICOLOR CALANCHI", callback_data: "point7"}],
                [{text:"8 - CAVA SANT'ANNA", callback_data: "point8"}],
                [{text:"9 - BALZA FORATA", callback_data: "point9"}],
                [{text:"10 - FLAT IRON", callback_data: "point10"}],
            ]
        }
    })
}

function ita_menu(ctx){
    ctx.telegram.sendMessage(ctx.chat.id, 'MENU',
    {
        reply_markup: {
            inline_keyboard:[
                [{text:"Carta Geologica del Furlo", callback_data: "map"}], 
                [{text:"Visuale Google Earth", callback_data: "goe"}],
                [{text:"Colonna Stratigrafica Successione Umbro-Marchigiana", callback_data: "ico"}],
                [{text:"Sezione Geologica 3D", callback_data: "sec"}],
                [{text:"1 - LA GOLA", callback_data: "point1"}],
                [{text:"2 - CAVA GRILLI", callback_data: "point2"}],
                [{text:"3 - TORBIDITI CARBONATICHE", callback_data: "point3"}],
                [{text:"4 - ACCESSO ALLA CAVA ALTA", callback_data: "point4"}],
                [{text:"5 - SLUMP", callback_data: "point5"}],
                [{text:"6 - AFFIORAMENTO FAGLIE NORMALI", callback_data: "point6"}],
                [{text:"7 - CALANCHI VARICOLORI", callback_data: "point7"}],
                [{text:"8 - CAVA SANT'ANNA", callback_data: "point8"}],
                [{text:"9 - BALZA FORATA", callback_data: "point9"}],
                [{text:"10 - FLAT IRON", callback_data: "point10"}],
            ]
        }
    })
}

// START BOT
bot.start( async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Welcome \n\nChoose language',
    {
        reply_markup: {
            inline_keyboard:[
                [{text:"English", callback_data: "eng"}], 
                [{text:"Italiano", callback_data: "ita"}]
            ]
        }
    })    
})

bot.action('eng', async ctx => {
    ctx.deleteMessage();
    lang = 'eng';
    eng_menu(ctx);
});

bot.action('ita', async ctx => {
    ctx.deleteMessage();
    lang = 'ita';
    ita_menu(ctx);
});

bot.action("menu", (ctx)=>{
    ctx.deleteMessage();
    if(lang == 'eng'){
        eng_menu(ctx);
    }
    if(lang == 'ita'){
        ita_menu(ctx); 
    }
    else{ctx.reply('Select a language.')}
})

bot.action('map', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Furlo Gorge Geologic Map'}
    if(lang == 'ita'){dsp = 'Carta Geologica della Gola del Furlo'}
    try{   
    await ctx.replyWithPhoto({ source: 'photo/carta.jpg' },{ caption: dsp });
    back_to_menu(ctx);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});

bot.action('goe', async (ctx) => {
    if(lang == 'eng'){dsp = 'Google Earth View'}
    if(lang == 'ita'){dsp = 'Visuale Google Earth'}
    ctx.deleteMessage();
    try{
    await ctx.replyWithPhoto({ source: 'photo/CatturaGE.JPG' },{ caption: dsp });
    back_to_menu(ctx);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});

bot.action('sec', async (ctx) => {
    if(lang == 'eng'){dsp = '3D Geologic Section'}
    if(lang == 'ita'){dsp = 'Sezione Geologica 3D'}
    ctx.deleteMessage();
    try{
    await ctx.replyWithPhoto({ source: 'photo/3D_1.PNG' });
    await ctx.replyWithPhoto({ source: 'photo/3D_2.PNG' });
    await ctx.replyWithPhoto({ source: 'photo/3D_3.PNG' });
    await ctx.replyWithPhoto({ source: 'photo/3D_4.PNG' },{ caption: dsp });
    back_to_menu(ctx);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});

bot.action('ico', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Umbro-Marchigiana Succession Stratigraphic Column'}
    if(lang == 'ita'){dsp = 'Colonna Stratigrafica Successione Umbro-Marchigiana'}
    if(lang == 'eng'){
        await ctx.replyWithPhoto({ source: 'photo/UMcol_it.jpg' },{ caption: dsp });
    }
    if(lang == 'ita'){
        await ctx.replyWithPhoto({ source: 'photo/UMcol_en.jpg' },{ caption: dsp });
    }
    else{}
    back_to_menu(ctx);
});

//POINT 1
bot.action('point1', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'THE GORGE\n\n'+
        'Along the Flaminia main road there are several small stopping areas (near the dam, traffic light pitch, Wheat Grotto) where it is possible to admire the high walls carved by the Candigliano river. The limestones layered in'+
        ' large banks hard to make out, are the oldest outcrops in the area: the Massive Limestone- In the lower Jurassic the Furlo Limestone Massif, settled in a shallow sea, was an elevated area coming up from the seabed, similar'+
        ' to present-day Bahamas Islands. In warm conditions, mono and multi-cell marine organisms fixed carbon dioxide in calcareous shells that could be carried by currents and wave motion, and transformed into small balls known'+
        ' as oods or olites, in spherules often visible even to the naked eyes or with a small lens. The morphology of the gorge alternates steep walls with some terraces that indicate evolutionary phases in the river incision.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Gorge picture", callback_data: "the_gorge"}], 
                    [{text:"Point coordinates", callback_data: "cor1"}],
                    [{text:"Next Geologic Point", callback_data: "point2"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'LA GOLA\n\n'+
        'Lungo la strada Statale Flaminia ci sono diversi punti di sosta (vicino alla diga, piazzola del semaforo, Grotta del grano) dove è possibile ammirare le alte pareti incise dal fiuma Candigliano. I calcari stratificati in '+
        'grossi banchi difficili da distinguere costituiscono la Formazione più antica affiorante nell’area: il Calcare Massiccio. Depositatosi in un mare basso, il Calcare Massiccio del Furlo costituiva nel Giurassico Inferiore '+
        'una zona rilevata del fondo marino simile alle isole Bahamas attuali. In condizioni calde gli organismi marini mono e pluri-cellulari fissavano l’anidride carbonica in gusci calcarei che potevano essere trasportati da correnti '+
        'e moto ondoso e trasformati in piccole palline note come ooidi o oliti, in sferule visibili spesso anche ad occhio nudo o con una piccola lente. La morfologia della gola alterna ripide pareti con alcuni terrazzamenti che '+
        'indicano fasi evolutive dell’incisione fluviale.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto della Gola", callback_data: "the_gorge"}], 
                    [{text:"Coordinate del punto", callback_data: "cor1"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point2"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('the_gorge', async (ctx) => {
    if(lang == 'eng'){dsp = 'The Furlo Gorge'}
    if(lang == 'ita'){dsp = 'Gola del Furlo'}
    ctx.deleteMessage();
    try{
    await  ctx.replyWithPhoto({ source: 'photo/1.jpg' }, { caption: dsp });
    back_to_menu_photo(ctx, 1);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor1', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'57.99\"N	 12°43\'43.63\"E'; 
    back_to_menu_coor(text, ctx,1,"the_gorge");
});

//POINT2
bot.action('point2', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'GRILLI QUARRY\n\n'+
        'It is accessed on foot after passing a barrier and going up a dirt road currently in poor condition due to the neglect of the site and its resulting abandonment. In the past, the quarry has been a place of extreme fatigue '+
        'and hard work due to the ancient stone extraction methods. Among the first outcrops along the highest sections of the road we are able to observe the levels of marl and nodular limestones colored in red and gray. It is the'+
        ' formation if the Red Ammonite. In the debris at the bottom it is not uncommon to find fragments of these fossils. Arriving on the square there is a large amphitheater consisting in the bottom part of formation of Carnelian,'+
        ' here called Pink Limestone with Crinoids (Echinoderms that live attached to the sea floor), which becomes gradually more stratified. Furthermore, at the top, we find a couple-of-meters-thick formation of Rosso Ammonitico,'+
        ' which is cut from small normal faults preceding the formation of the anticline fold. Above it, some layered limestone units appear, among which the Maiolica Formation is very evident, cut by a large fault visible opposite the arrival landing.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Site picture", callback_data: "grilli_quarry"}], 
                    [{text:"Point coordinates", callback_data: "cor2"}],
                    [{text:"Next Geologic Point", callback_data: "point3"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'CAVA GRILLI\n\n'+
        'Si accede a piedi dopo aver superato una sbarra e risalito uno sterrato attualmente in pessime condizioni per la dismissione e il conseguente abbandono del sito. La cava è stata in passato scenario di estrema fatica e '+
        'duro lavoro dovuto alle antiche metodologie di estrazione della pietra. Tra i primi affioramenti lungo la parte più alta della strada si possono osservare i livelli di marne e calcari nodulari colorati di rosso e di grigio.'+
        ' Si tratta della Formazione del Rosso Ammonitico. Nel detrito alla base non è infrequente trovare frammenti di questi fossili.\nArrivati sul piazzale si apre un ampio anfiteatro costituito nella parte basale dalla formazione '+
        'della Corniola, qui chiamata Calcare Rosa a Crinoidi (Echinodermi che vivono attaccati al fondo) che diviene via via più stratificata. Affiora quindi la formazione spesa un paio di metri del Rosso Ammonitico che è tagliata da'+
        ' piccole faglie normali precedenti alla formazione della piega anticlinale. Sopra compaiono alcune unità di calcari stratificati tra i quali è molto evidente la Formazione della Maiolica, tagliata da una grande Faglia visibile proprio nella parte opposta dell’arrivo nel piazzale.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto della Cava", callback_data: "grilli_quarry"}], 
                    [{text:"Coordinate del punto", callback_data: "cor2"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point3"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('grilli_quarry', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Grilli Quarry'}
    if(lang == 'ita'){dsp = 'Cava Grilli'}
    try{
    await  ctx.replyWithPhoto({ source: 'photo/2.jpg' }, { caption:dsp });
    back_to_menu_photo(ctx, 2);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor2', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'30.00\"N	 12°42\'46.45\"E'; 
    back_to_menu_coor(text, ctx,2,"grilli_quarry");
});

//POINT3
bot.action('point3', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'CARBONATIC TURBIDITES\n\n'+
        'Along the road that goes up the side of Monte Pietralata we can see that stratification of pink limestones of the Scaglia Rossa Formation. Notables are some layers that emerge by selective erosion from the outcrops. They are calcarenitic layers, that is, made up of cemented '+
        'limestone sands that were transported by flows before being deposited (there is an internal plane-parallel lamination, that is, thin layers linked to the flows.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Turbidite pictures", callback_data: "carb_turb"}], 
                    [{text:"Point coordinates", callback_data: "cor3"}],
                    [{text:"Next Geologic Point", callback_data: "point4"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'TORBIDITI CARBONATICHE\n\n'+
        'Lungo la strada che risale il fianco del Monte Pietralata è visibile la stratificazione di calcari rosa della Formazione della Scaglia Rossa. Rilevanti alcuni strati che emergono per erosione selettiva dagli affioramenti. Sono strati calcarenitici, cioè costituiti da sabbie'+
        ' calcaree cementate che sono state trasportate da flussi prima di essere depositate (presente una laminazione piano-parallela interna, cioè sottili strati legati ai flussi).',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto delle Torbiditi", callback_data: "carb_turb"}], 
                    [{text:"Coordinate del punto", callback_data: "cor3"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point4"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('carb_turb', async (ctx) => {
    if(lang == 'eng'){dsp = 'Carbonatic Turbidites'}
    if(lang == 'ita'){dsp = 'Torbiditi Carbonatiche'}
    ctx.deleteMessage();
    try{
    await  ctx.replyWithPhoto({ source: 'photo/3.jpg' }, { caption:dsp });
    back_to_menu_photo(ctx, 3);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor3', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'18.71\"N	 12°42\'28.96\"E\n\n43°38\'12.60\"N	 12°42\'34.38\"E'; 
    back_to_menu_coor(text, ctx,3,"carb_turb");
});

//POINT4
bot.action('point4', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'ACCESS TO THE HIGH QUARRY\n\n'+
        'Here too, after walking around a closed barrier, you go along a stretch of road where the layers of the Scaglia Rossa are visible from the side. Once we get to a wide area where there is an old abandoned garage he following are visible from below:\n'+
        '-	the Formation of White Scale with slates and black flint nodules in medium layers;\n'+
        '-	the Bonarelli level consisting of organic materials and dark volcano-derivates (just over a meter thick) where fish fossil can occasionally be found;\n'+
        '-	just above this level, when the first layer with red flint strips and nodules appears, the transition to the Formation of the Red Scale is placed\n'+
        'Looking carefully, a bit above, we can see another Bonarelli level. This doubling has been interpreted as linked to an underwater landside from raised areas, probably from a sin-sedimentary tectonic (tectonic movements occurred during the sedimentation period of the Red Scale).',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"High quarry picture", callback_data: "high_quarry"}], 
                    [{text:"Point coordinates", callback_data: "cor4"}],
                    [{text:"Next Geologic Point", callback_data: "point5"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'ACCESSO ALLA CAVA ALTA\n\n'+
        'Anche qui dopo aver superato una sbarra chiusa, si percorre un tratto di strada in cui sono visibili lateralmente gli strati della Scaglia Rossa. Arrivati in un largo dove c’è una vecchia rimessa abbandonata, sono visibili dal basso:\n-	la Formazione della Scaglia Bianca con liste e noduli di selce nera in strati medi;\n'+
        '-	Il Livello Bonarelli costituito da materiali organici e vulcano-derivati scuri di poco più di un metro di spessore, in cui è occasionalmente possibile trovare fossili di pesci;\n'+
        '-	poco al di sopra di questo Livello, alla comparsa del primo strato con liste e noduli di selce rossa, è posto il passaggio alla Formazione della Scaglia Rossa;\n'+
        'Osservando bene più in alto si vede un altro Livello Bonarelli. Questo raddoppio è stato interpretato come legato ad una frana sottomarina che ha portato da zone rialzate, probabilmente da una tettonica sin-sedimentaria (movimenti tettonici avvenuti durante il periodo della sedimentazione della Scaglia Rossa).',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto della Cava Alta", callback_data: "high_quarry"}], 
                    [{text:"Coordinate del punto", callback_data: "cor4"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point5"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('high_quarry', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'High Quarry'}
    if(lang == 'ita'){dsp = 'Cava Alta'}
    try{
    await  ctx.replyWithPhoto({ source: 'photo/4.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 4);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor4', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'35.68\"N	 12°42\'32.74\"E'; 
    back_to_menu_coor(text, ctx,4,"high_quarry");
});

//POINT5
bot.action('point5', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'SLUMP\n\n'+
        'Along the path (5a) that from the church of Pietralata leads to “il Conio” and near the Scotanelli hamlet (5b) on the Paganuccio Mount, folded and chaotic layers are visible. It is a slump, underwater landslide, inside the Scaglia Rossa. Here, as in other places, we can see the result of movements of rock volumes due to tectonic instability during the deposition' +
        ' of the sedimentary unit. Despite the fact that this cretaceous-paleogenic limestone sequence is interpreted as a succession deposited along a passive continental margin - i.e. a margin in which there are no earthquakes - the tectonics raised parts of the sea basin and lowered others, setting the poorly-consolidated stratified sediments in gravitational motion.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Slump picture", callback_data: "slump"}], 
                    [{text:"Point coordinates", callback_data: "cor5"}],
                    [{text:"Next Geologic Point", callback_data: "point6"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'SLUMP\n\n'+
        'Sia lungo il sentiero che va dalla chiesetta di Petralata porta al Conio (5a) che sulla strada appena sopra Scotanelli sul Paganuccio (5b), sono visibili strati piegati e caoticizzati. Si tratta di uno slump, una frana sottomarina, all’interno della Scaglia Rossa. In questi siti (ma anche altrove) si può osservare quindi il risultato di movimenti di volumi'+
        ' di roccia dovuti a instabilità tettonica durante la deposizione dell’unità sedimentaria. Nonostante infatti che questa sequenza calcarea creatacica-paleogenica sia interpretata come una successione depositata lungo un margine continentale passivo, ovvero in cui non sono presenti terremoti, tuttavia la tettonica sollevava parti del bacino marino e ne ribassava altre, mettendo in moto gravitativo i sedimenti stratificati ancora poco consolidati.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto dello Slump", callback_data: "slump"}], 
                    [{text:"Coordinate del punto", callback_data: "cor5"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point6"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('slump', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Slump'}
    if(lang == 'ita'){dsp = 'Slump'}
    try{
    await ctx.replyWithPhoto({ source: 'photo/5a.jpg' });
    await ctx.replyWithPhoto({ source: 'photo/5b.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 5);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor5', async (ctx) => {
    ctx.deleteMessage();
    text = '5a - 43°39\'3.91\"N	 	12°41\'41.45\"E\n\n5b - 43°36\'49.09\"N	 12°45\'46.30\"E'; 
    back_to_menu_coor(text, ctx,5,"slump");
});

//POINT6
bot.action('point6', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'OUTCROP SHOWING NORMAL FAULTS\n\n'+
        'Percorrendo la strada a Nord di Ca Giovannetto, attraversando uno dei ruscelli che incidono il versante sud-ovest di Monte Pietralata, appare un affioramento di Scaglia Rossa. Da un attenta osservazione, si possono osservare che gli strati sono interrotti da piani di faglia che a luoghi mostrano brecce legate alla frizione tra le rocce e fibre di calcite che insieme al riconoscimento degli strati sono da una parte all’altra del piano di faglia, indicano movimenti definibili “normali” (il tetto, la parte superiore rispetto al piano di faglia, si abbassa rispetto al letto, quella sotto al piano stesso).'+
        ' In generale la parte più a Sud dell’affioramento è ribassata rispetto quella più a Nord. Questa osservazione conduce a pensare che il versante in questione sia interessato da una tettonica distensiva (estensionale) successiva a quella del piegamento della dorsale Pietralata-Paganuccio. Fenomeni comunque di movimenti profondi di versante, ben visibili anche nella parte del Monte Paganuccio, indicano che la forza di gravità sta agendo sulle masse deformate della montagna.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Outcrop picture", callback_data: "normal_faults"}], 
                    [{text:"Point coordinates", callback_data: "cor6"}],
                    [{text:"Next Geologic Point", callback_data: "point7"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'AFFIORAMENTO CON FAGLIE NORMALI\n\n'+
        'Percorrendo la strada a Nord di Ca Giovannetto, attraversando uno dei ruscelli che incidono il versante sud-ovest di Monte Pietralata, appare un affioramento di Scaglia Rossa. Da un attenta osservazione, si possono osservare che gli strati sono interrotti da piani di faglia che a luoghi mostrano brecce legate alla frizione tra le rocce e fibre di calcite che insieme al riconoscimento degli strati sono da una parte all’altra del piano di faglia, indicano movimenti definibili “normali” (il tetto, la parte superiore rispetto al piano di faglia, si abbassa rispetto al letto, quella sotto al piano stesso).'+
        ' In generale la parte più a Sud dell’affioramento è ribassata rispetto quella più a Nord. Questa osservazione conduce a pensare che il versante in questione sia interessato da una tettonica distensiva (estensionale) successiva a quella del piegamento della dorsale Pietralata-Paganuccio. Fenomeni comunque di movimenti profondi di versante, ben visibili anche nella parte del Monte Paganuccio, indicano che la forza di gravità sta agendo sulle masse deformate della montagna.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto dell'affioramento", callback_data: "normal_faults"}], 
                    [{text:"Coordinate del punto", callback_data: "cor6"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point7"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('normal_faults', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Normal Faults'}
    if(lang == 'ita'){dsp = 'Faglie Normali'}
    try{
    await ctx.replyWithPhoto({ source: 'photo/6_1.jpg' });
    await ctx.replyWithPhoto({ source: 'photo/6_2.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 6);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor6', async (ctx) => {
    ctx.deleteMessage();
    text = '43°39\'23.09\"N	 12°41\'17.93\"E'; 
    back_to_menu_coor(text, ctx,6,"normal_faults");
});

//POINT7
bot.action('point7', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'VARICOLOR CALANCHI\n\n'+
        'Along the road on the north-west side of Pietralata – from which we can see Fermignano, the North section of Urbino and in the distance Monte Titano in San Marino – we cross a marly unit with colors ranging from red, to gray, to green. This is the Scaglia Variegata Formation which'+
        ' is sculpted by the runoff of the water in characteristic gullies, where the stratification in marked by more resistant light carbonate levels.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Calanchi picture", callback_data: "varc_calanchi"}], 
                    [{text:"Point coordinates", callback_data: "cor7"}],
                    [{text:"Next Geologic Point", callback_data: "point8"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'CALANCHI VARICOLORI\n\n'+
        'Lungo la strada sul versante di nord-ovest del Pietralata, da cui si vede al di sotto Fermignano e verso nord Urbino e oltre anche il Monte Titano di San Marino, si attraversa una unità marnosa con colori che vanno dal rosso, al grigio, al verde. Si tratta della Formazione della '+
        'Scaglia Variegata che viene scolpita dal ruscellamento delle acque in caratteristici calanchi, dove la stratificazione è segnata da livelli carbonatici chiari più resistenti.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto dei Calanchi", callback_data: "varc_calanchi"}], 
                    [{text:"Coordinate del punto", callback_data: "cor7"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point8"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('varc_calanchi', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = 'Varicolor Calanchi'}
    if(lang == 'ita'){dsp = 'Calanchi Varicolori'}
    try{
    await ctx.replyWithPhoto({ source: 'photo/7a.jpg' });
    await ctx.replyWithPhoto({ source: 'photo/7b.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 7);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor7', async (ctx) => {
    ctx.deleteMessage();
    text = '7a - 43°40\'18.49\"N	 12°40\'57.70\"E\n\n7b - 43°37\'2.57\"N	 	12°47\'7.72\"E'; 
    back_to_menu_coor(text,ctx,7,"varc_calanchi");
});

//POINT8
bot.action('point8', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'CAVA SANT’ANNA\n\n'+
        'The site is inaccessible, since it consists of private land, and yet it is important from a geological and historical point of view and it must be included among the sites of interest. The quarry fronts have brought to light a more complete and defined succession than in other areas of the Furlo. Here we can '+
        'observe, in order of more ancient terms, the following formations: Corniola, Rosso Ammonitico, Calcari Diasprigni, maiolica, Marne a Fucoidi (visible at the top in the Eastern side of the quarry, due to erosion and colors), Scaglia Bianca and Scaglia Rossa (along the entrance road). Numerous fossiliferous '+
        'specimens derive from this quarry, in particular ammonites. This complete succession can be interpreted as sedimented in a basin, differentiating itself from that of the Cava Grilli and the south-eastern slope of Pietralata, defined as a platform. The latter is reduced, or condensed, and also constituted by '+
        'lithological unit such as the Bugarone which are deposits derived from erosions of other formations and resedimented in escarpment areas.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Site picture", callback_data: "s_anna"}], 
                    [{text:"Point coordinates", callback_data: "cor8"}],
                    [{text:"Next Geologic Point", callback_data: "point9"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'CAVA SANT’ANNA\n\n'+
        'Importante dal punto di vista geologico e storico, questo luogo risulta ancora oggi inaccessibile perché costituito da terreni privati, ma la sua importanza lo include a pieno fra i siti di interesse. I fronti di cava hanno portato alla luce una successione più completa e definita che in altre zone del Furlo. '+
        'Qui si possono osservare in ordine di termini più antici, le seguenti formazioni: Corniola, Rosso Ammonitico, Calcari Diasprigni, maiolica, Marne a Fucoidi (visibili in alto nel versante orientale della cava, per l’erosione e i colori), Scaglia Bianca e Scaglia Rossa (lungo la strada di ingresso). Da questa'+
        ' cava derivano numerosi campioni fossiliferi, in particolar modo ammoniti. Tale successione completa è interpretabile come sedimentata in un bacino, differenziandosi da quella della Cava Grilli e del versante sud-orientale del Pietralata, definita di piattaforma. Quest’ultima è ridotta o condensata e costituita'+
        ' anche da unità litologiche come il Bugarone che sono depositi derivati da erosioni di altre formazioni e risedimentate in zona di scarpata.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto del Sito", callback_data: "s_anna"}], 
                    [{text:"Coordinate del punto", callback_data: "cor8"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point9"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('s_anna', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = "Cava Sant'Anna"}
    if(lang == 'ita'){dsp = "Cava Sant'Anna"}
    try{
    await ctx.replyWithPhoto({ source: 'photo/8_1.jpg' });
    await ctx.replyWithPhoto({ source: 'photo/8_2.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 8);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor8', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'52.82\"N	 12°44\'24.30\"E'; 
    back_to_menu_coor(text, ctx,8,"s_anna");
});

//POINT9
bot.action('point9', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'BALZA FORATA\n\n'+
        'It falls within the “strict nature reserve” area. It is an imposing gap in the Calcare Massiccio wall, witness to epigean karst phenomena, it is not the only one in the area. Cracks'+
        ' and chimneys are indeed evident along the entire extension of the limestone walls.\n ATTENTION: since it is located in the area under “full protection”. It is possible to visit this site only with a permit issued by the Reserve Administration.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Balza forata", callback_data: "balza_forata"}], 
                    [{text:"Point coordinates", callback_data: "cor9"}],
                    [{text:"Next Geologic Point", callback_data: "point10"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'BALZA FORATA\n\n'+
        'Ricade nella zona della riserva a tutela integrale. E’ un imponente varco nella parete di Calcare Massiccio, testimone di fenomeni di carsismo epigeo, non risulta essere l’unica'+
        ' nella zona, fessure e camini sono infatti evidenti per l’intera estensione delle pareti calcaree.\n ATTENZIONE: poiché si trova nella zona di tutela integrale è possibile visitarla solo se in possesso di un permesso rilasciato dall’amministrazione della Riserva!',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Balza forata", callback_data: "balza_forata"}], 
                    [{text:"Coordinate del punto", callback_data: "cor9"}],
                    [{text:"Prossimo Punto di interesse Geologico", callback_data: "point10"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('balza_forata', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = "Balza Forata"}
    if(lang == 'ita'){dsp = "Balza Forata"}
    try{
    await ctx.replyWithPhoto({ source: 'photo/9.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 9);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor9', async (ctx) => {
    ctx.deleteMessage();
    text = '43°38\'36.44\"N	 12°43\'47.08\"E'; 
    back_to_menu_coor(text,ctx,9,"balza_forata");
});

//POINT10
bot.action('point10', async ctx => {
    ctx.deleteMessage();
    if(lang == 'eng'){
        ctx.telegram.sendMessage(ctx.chat.id, 'FLAT IRON\n\n'+
        'They are morphological forms resulting from selective erosion on deformed lithological units. They are found on the sides of Monte Pietralata and Monte Paganuccio. They have a roughly triangular shape reminiscent of an iron! Here, the succession of more competent'+
        ' rocks of the Scaglie Group, deformed in the large anticline fold, is eroded in its most recent term, the Scaglia Cinerea, composed largely of clayey and marly layers. Above this unit, the formation of the Bisciaro – made up of more calcareous, less erodible lithologies – form these “irons” resting on the external sides on the Furlo mountains.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Flat Iron picture", callback_data: "flat_iron"}], 
                    [{text:"Point coordinates", callback_data: "cor10"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        })
    } 
    if(lang == 'ita'){
        ctx.telegram.sendMessage(ctx.chat.id, 'FLAT IRON\n\n'+
        'Sono forme morfologiche risultanti da erosione selettiva su unità litologiche deformate. Si ritrovano infatti sui fianchi del Monte Pietralata e del Monte Paganuccio. Hanno una forma all’incirca triangolare che ricorda appunto quella di un ferro da stiro!\n'+
        ' Qui la successione di rocce più competenti della serie delle Scaglie deformata nella grande piega anticlinale viene erosa nel suo termine più recente, la Scaglia Cinerea, composta in gran parte  da strati argillosi e marnosi. Al di sopra di questa unità invece'+
        ' la formazione del Bisciaro costituita da litologie più calcaree, meno erodibili, forma questi ferri da stiro “appoggiati” ai fianchi esterni dei monti del Furlo.',
        {
            reply_markup: {
                inline_keyboard:[
                    [{text:"Foto del Flat Iron", callback_data: "flat_iron"}], 
                    [{text:"Coordinate del punto", callback_data: "cor10"}],
                    [{text:"Menu", callback_data: "menu"}]
                ]
            }
        }) 
    }
    else{}
});
bot.action('flat_iron', async (ctx) => {
    ctx.deleteMessage();
    if(lang == 'eng'){dsp = "Flat Iron"}
    if(lang == 'ita'){dsp = "Flat Iron"}
    try{
    await ctx.replyWithPhoto({ source: 'photo/10.jpg' },{ caption: dsp });
    back_to_menu_photo(ctx, 10);
    }
    catch(err){
        ctx.reply('Error 400 Sorry i miss picture!')
    }
});
bot.action('cor10', async (ctx) => {
    ctx.deleteMessage();
    text = '43°37\'24.82\"N	 12°48\'16.03\"E\n43°38\'11.24\"N	 12°47\'25.23\"E\n43°38\'31.36\"N	 12°47\'1.39\"E'+
    '\n43°39\'2.63\"N	 	12°46\'13.25\"E\n43°40\'19.39\"N	 12°43\'6.02\"E\n43°40\'32.18\"N	 12°42\'8.11\"E\n43°40\'38.32\"N	 12°41\'23.14\"E'; 
    back_to_menu_coor(text, ctx,10,"flat_iron");
});

bot.launch()

//SERVER EXPRESS
//app.listen(process.env.PORT || 5001)