(this.webpackJsonprobin_hood=this.webpackJsonprobin_hood||[]).push([[0],{13:function(e,a,n){},14:function(e,a,n){},18:function(e,a,n){"use strict";n.r(a);var c=n(2),r=n.n(c),i=n(8),t=n.n(i),s=(n(13),n(1)),o=n(3),u=(n(14),n.p+"static/media/robin.83aa1f3e.jpg"),d=n.p+"static/media/compagnon.e626d0c4.jpg",l=n.p+"static/media/sheriff.38b3bcd1.jpg",h=n.p+"static/media/adjoint.d48cc3c6.jpg",p=n.p+"static/media/embobineur.dc9601ba.jpg",m=n.p+"static/media/moine.70c350f7.jpg",f=n.p+"static/media/paysanne.ff6d01e5.jpg",j=[{id:1,name:"Robin",color:"green",image:u,power:"D\xe9masquez le Sh\xe9riff et ses adjoints"},{id:2,name:"Compagnon",color:"green",image:d,power:"Rejouez"},{id:3,name:"Compagnon",color:"green",image:d,power:"Rejouez"},{id:4,name:"Sheriff",color:"red",image:l,power:"D\xe9masquez Robin et ses compagnons"},{id:5,name:"Adjoint",color:"red",image:h,power:"M\xe9langez deux cartes"},{id:6,name:"Adjoint",color:"red",image:h,power:"M\xe9langez deux cartes"},{id:7,name:"Embobineur",color:"pink",image:p,power:"Vous devez mentir"},{id:8,name:"Moine",color:"blue",image:m,power:"Retournez une carte"},{id:9,name:"Paysanne",color:"yellow",image:f,power:"Il ne se passe rien"},{id:10,name:"Paysanne",color:"yellow",image:f,power:"Il ne se passe rien"},{id:11,name:"Sorci\xe8re",color:"purple",image:n.p+"static/media/sorciere.fd97f35c.jpg",power:"Prenez une deuxi\xe8me carte, consultez-la, puis replacez les deux cartes face cach\xe9e"},{id:12,name:"Tra\xeetre",color:"grey",image:n.p+"static/media/traitre.e847e3de.jpg",power:"Vous perdez une vie"}],b=n(6),v=n.p+"static/media/robin-wood-back.cd6242ba.jpg";function O(e,a){for(var n=!1,c=0;c<a.length;c++){a[c]===e&&(n=!0)}return n}var C=n(0);var g=function(e){var a=e.handleClickedCard,n=e.characters,c=e.activeCard,r=e.round,i=e.activePlayer;return Object(C.jsx)("div",{className:"board",children:n.map((function(e){return Object(C.jsx)("div",{className:"card-outer "+(O(e.id,c)?"flipped ":"")+(O(e.id,r.clickedCard)?"clicked ":"")+(i?"one":""),onClick:function(){return a(e)},children:Object(C.jsxs)("div",{className:"card",children:[Object(C.jsx)("div",{className:"front",children:Object(C.jsx)("img",{className:"character-img",src:e.image})}),Object(C.jsx)("div",{className:"back",children:Object(C.jsx)("img",{className:"character-img",src:v})})]})})}))})};var k=function(e){var a=e.players,n=e.player,c=e.onChange,r=e.onMenuClick;return Object(C.jsxs)("div",{className:"player ".concat(n?"one":"two"),children:[Object(C.jsx)("div",{className:"player-icon"}),Object(C.jsx)("input",{value:a[n?0:1].name,onChange:function(e){return c(e.target.value,n?0:1)}}),Object(C.jsx)("div",{className:"player-lifes",children:"\u2764\ufe0f".repeat(a[n?0:1].life)}),Object(C.jsxs)("div",{className:"menu",onClick:r,children:[Object(C.jsx)("div",{className:"bar"}),Object(C.jsx)("div",{className:"bar"}),Object(C.jsx)("div",{className:"bar"})]})]})};var S=function(e){var a=e.onChoiceClick,n=e.onAnswerClick,c=e.activePlayer,r=e.round,i=e.player;return Object(C.jsx)("div",{className:"choice-container "+(i?"one":"two"),children:Object(C.jsx)("div",{className:"choice-buttons",children:c?Object(C.jsx)(C.Fragment,{children:[{label:"Je suis Robin",character:"Robin"},{label:"Je suis un compagnon",character:"Compagnon"},{label:"Je suis le Sh\xe9riff",character:"Sheriff"},{label:"Je suis un adjoint",character:"Adjoint"},{label:"Je suis le moine",character:"Moine"},{label:"Je suis une paysanne",character:"Paysanne"},{label:"Je suis la sorci\xe8re",character:"Sorciere"},{label:"Je passe",character:"Passe"}].map((function(e){return Object(C.jsx)("button",{className:"choice "+(r.chosenCharacter===e.character?"clicked":""),onClick:function(){return a(e)},children:e.label})}))}):Object(C.jsx)(C.Fragment,{children:["Je te crois","Je t'accuse"].map((function(e){return Object(C.jsx)("button",{className:"choice "+(r.chosenAnswer===e?"clicked":""),onClick:function(){return n(e)},children:e})}))})})})},N=n.p+"static/media/history.f1dcf3d6.png",x=n.p+"static/media/book.aeda2440.png",y=n.p+"static/media/replay.ab81de1c.png",J=n.p+"static/media/list.82dd8862.png";var z=function(e){var a=e.hideMenu,n=e.onMenuClick,c=e.onRulesClick,r=e.onReplayClick;return Object(C.jsx)("div",{className:"menu-overlay "+(a?"hidden":""),onClick:n,children:Object(C.jsxs)("div",{className:"main-menu",children:[Object(C.jsxs)("div",{className:"menu-section rules",onClick:c,children:[Object(C.jsx)("img",{src:x,alt:"book"}),Object(C.jsx)("div",{className:"title",children:"R\xe8gles"})]}),Object(C.jsxs)("div",{className:"menu-section history",children:[Object(C.jsx)("img",{src:N,alt:"history"}),Object(C.jsx)("div",{className:"title",children:"Historique"})]}),Object(C.jsxs)("div",{className:"menu-section powers",children:[Object(C.jsx)("img",{src:J,alt:"list"}),Object(C.jsx)("div",{className:"title",children:"Pouvoirs"})]}),Object(C.jsxs)("div",{className:"menu-section replay",onClick:r,children:[Object(C.jsx)("img",{src:y,alt:"replay"}),Object(C.jsx)("div",{className:"title",children:"Rejouer"})]})]})})},w=n.p+"static/media/cross.37c068e7.png";var R=function(e){var a=e.popupStates,n=e.onCrossClick,c=e.onRulesClick;return Object(C.jsx)("div",{className:"popup "+(a.hidePopup?"hidden":""),children:Object(C.jsxs)("div",{className:"info-container",children:[Object(C.jsx)("img",{src:w,onClick:n}),Object(C.jsx)("p",{children:a.popupMessage}),Object(C.jsx)("button",{className:a.hideButton?"hidden":"",onClick:c,children:a.buttonMessage})]})})};var q=function(){var e=Object(c.useState)([]),a=Object(o.a)(e,2),n=a[0],r=a[1],i=Object(c.useState)(Object(b.shuffle)(j)),t=Object(o.a)(i,2),u=t[0],d=t[1],l=Object(c.useState)(1===Math.floor(2*Math.random())),h=Object(o.a)(l,2),p=h[0],m=h[1],f=Object(c.useState)([]),v=Object(o.a)(f,2),N=(v[0],v[1]),x=Object(c.useState)(!0),y=Object(o.a)(x,2),J=y[0],w=y[1],q=Object(c.useState)({player:p,clickedCard:[],clickedCharacter:"",chosenCharacter:"",chosenAnswer:""}),M=Object(o.a)(q,2),P=M[0],A=M[1],L=Object(c.useState)([{name:"Joueur 1",life:2},{name:"Joueur 2",life:2}]),B=Object(o.a)(L,2),V=B[0],D=B[1],E=Object(c.useState)({popupMessage:"Bienvenue compagnon ! Pr\xeat \xe0 relever les d\xe9fis de la for\xeat de Sherwood ?\n    \nC'est \xe0 ".concat(V[p?0:1].name," de commencer !"),hidePopup:!1,buttonMessage:"R\xe8gles du jeu",hideButton:!1}),I=Object(o.a)(E,2),T=I[0],U=I[1];Object(c.useEffect)((function(){_()}),[V]);var F=function(){return"Sorciere"===P.chosenCharacter},_=function(){return 0===V[0].life?"".concat(V[1].name," a gagn\xe9"):0===V[1].life?"".concat(V[0].name," a gagn\xe9"):void 0},H=function(e){if(""!==P.chosenCharacter||0===P.clickedCard.length||O(P.clickedCard[0],n)||"Passe"!==e.character||12===P.clickedCard[0])if("Passe"!==e.character||"Robin"!==P.chosenCharacter&&"Sheriff"!==P.chosenCharacter||""===P.chosenAnswer){if(""===P.chosenCharacter&&0!==P.clickedCard.length&&!O(P.clickedCard[0],n)){var a=JSON.parse(JSON.stringify(P));a.chosenCharacter=e.character,A(a),N((function(a){return[].concat(Object(s.a)(a),[V[p?0:1].name+" est "+e.character])}))}}else G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a a pass\xe9 son tour"])}));else G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a pass\xe9 son tour"])}))},G=function(e){m(e?!p:p),A({player:p,clickedCard:[],clickedCharacter:"",chosenCharacter:"",chosenAnswer:""})},K=function(e){if(""===P.chosenAnswer&&P.clickedCard!==[]&&""!==P.chosenCharacter){var a=JSON.parse(JSON.stringify(P));a.chosenAnswer=e,"Adjoint"!==P.chosenCharacter&&"Robin"!==P.chosenCharacter&&"Sheriff"!==P.chosenCharacter||(a.clickedCard=[]),A(a),N((function(a){return[].concat(Object(s.a)(a),[V[p?1:0].name+" r\xe9pond : "+e])}))}if(P.chosenCharacter!==P.clickedCharacter&&""===P.chosenAnswer&&"Je t'accuse"===e&&""!==P.chosenCharacter){var n=JSON.parse(JSON.stringify(V));n[p?0:1].life=V[p?0:1].life-1,D(n),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" perd une vie"])}))}else if(P.chosenCharacter===P.clickedCharacter&&"Je t'accuse"===e){var c=JSON.parse(JSON.stringify(V));c[p?1:0].life=V[p?1:0].life-1,D(c),Y(P.chosenCharacter),N((function(e){return[].concat(Object(s.a)(e),[V[p?1:0].name+" perd une vie"])}))}else"Je te crois"===e&&Y(P.chosenCharacter)},Q=function(e,a){var n=JSON.parse(JSON.stringify(V));n[a].name=e,D(n)},W=function(){w(!J)},X=function(){var e=JSON.parse(JSON.stringify(T));e.popupMessage="INTRODUCTION\nDans la for\xeat de Sherwood, la lutte entre les compagnons de Robin des Bois et les adjoints du sh\xe9rif de Nottingham fait rage. Chaque camp cherche \xe0 infiltrer le clan adverse pour enfin dominer la r\xe9gion. En tant que simple citoyen, vous \xeates coinc\xe9 entre ces deux factions. Vous sauverez votre peau en d\xe9non\xe7ant Robin et ses compagnons, ou en d\xe9masquant le sh\xe9rif et ses adjoints, infiltr\xe9s dans le campement de Robin.\n\nBUT DU JEU\nLe premier joueur \xe0 d\xe9masquer les 3 cartes d\u2019un camp (Le Sheriff et ses adjoint ou Robin et ses compagnons) remporte la partie. Un joueur remporte aussi la partie si l\u2019autre joueur n\u2019a plus de vies. Chaque joueur commence avec 2 vies.\n\nD\xc9ROULEMENT\nVoici comment se d\xe9roule le tour d\u2019un joueur :\n\u2022\tVous retournez une carte face cach\xe9e sans que l\u2019autre joueur ne la voit puis vous la reposez. Attention : Si vous pioch\xe9 le traitre, vous perdez une vie et votre tour s\u2019arr\xeate.\n\u2022\tVous prenez ensuite la d\xe9cision de passer votre tour, d\u2019annoncer le personnage que vous venez de consulter ou bien d\u2019en annoncer un autre et dans ce cas, vous \xeates un vilain menteur. Attention : Si vous avez pioch\xe9 l\u2019embobineur, vous \xeates oblig\xe9 de mentir !\n\u2022\tLe joueur adverse peut choisir de vous croire ou vous accuser de mentir.\n\u2022\tS\u2019il ne vous croit pas et que vous mentez, vous perdez une vie, autrement c\u2019est lui qui perd une vie et vous utilisez votre pouvoir.\n\u2022\tS\u2019il vous croit, vous utilisez le pouvoir du personnage que vous avez annonc\xe9 :\no Robin : Le pouvoir de Robin est de s\xe9lectionner 3 cartes face cach\xe9es. Si derri\xe8re ces cartes se cachent le Sherif et ses 2 adjoints, vous remportez la partie, autrement vous perdez une vie. Lorsque vous \xeates Robin, vous pouvez aussi choisir de ne pas d\xe9masquer et de passer votre tour.\no Compagnon : Lorsque vous d\xe9clenchez le pouvoir du compagnon, vous rejouez.\no Sheriff : Le pouvoir du Sheriff est de s\xe9lectionner 3 cartes face cach\xe9es. Si derri\xe8re ces cartes se cachent Robin et ses 2 compagnons, vous remportez la partie, autrement vous perdez une vie. Lorsque vous \xeates le Sheriff, vous pouvez aussi choisir de ne pas d\xe9masquer et de passer votre tour.\no Adjoint : Lorsque vous d\xe9clenchez le pouvoir de l\u2019adjoint, vous s\xe9lectionnez deux cartes face cach\xe9e qui \xe9changent de place.\no Paysanne : Il ne se passe rien.\no Moine : Vous pouvez choisir une carte face cach\xe9e qui sera visible jusqu\u2019\xe0 la fin de la partie.\no Sorci\xe8re : Vous pouvez consulter une carte du plateau sans que l\u2019autre joueur ne la voit.\n\u2022\tUne fois que vous avez d\xe9clench\xe9 un pouvoir, c\u2019est au tour de l\u2019autre de joueur.",e.hidePopup=!1,e.hideButton=!0,U(e)},Y=function(e){switch(e){case"Paysanne":G(!0);break;case"Compagnon":G(!1);break;default:return}};return Object(C.jsxs)("div",{className:"app",children:[Object(C.jsx)(z,{hideMenu:J,onMenuClick:W,onRulesClick:X,onReplayClick:function(){r([]),d(Object(b.shuffle)(j)),m(1===Math.floor(2*Math.random())),N([]),A({player:p,clickedCard:[],clickedCharacter:"",chosenCharacter:"",chosenAnswer:""}),D([{name:V[0].name,life:2},{name:V[1].name,life:2}]),U({popupMessage:"Bienvenue compagnon ! Pr\xeat \xe0 relever les d\xe9fis de la for\xeat de Sherwood ?\n      \nC'est \xe0 ".concat(V[p?0:1].name," de commencer !"),hidePopup:!1,buttonMessage:"R\xe8gles du jeu",hideButton:!1})}}),Object(C.jsx)(R,{popupStates:T,onCrossClick:function(){var e=JSON.parse(JSON.stringify(T));e.hidePopup=!0,U(e)},onRulesClick:X}),Object(C.jsx)(k,{players:V,player:!0,onChange:Q,onMenuClick:W}),Object(C.jsx)(S,{onChoiceClick:H,onAnswerClick:K,activePlayer:p,player:!0,round:P}),Object(C.jsx)(g,{handleClickedCard:function(e){if(0!==P.clickedCard.length||O(e.id,n)||12!==e.id||""!==P.chosenCharacter)if("Adjoint"!==P.chosenCharacter||O(e.id,n)){if("Robin"===P.chosenCharacter||"Sheriff"===P.chosenCharacter){if(0===P.clickedCard.length||1===P.clickedCard.length){var a=JSON.parse(JSON.stringify(P));a.clickedCard.push(e.id),a.clickedCharacter=e.name,A(a)}else if(2===P.clickedCard.length){var c=u[u.map((function(e){return e.id})).indexOf(P.clickedCard[0])].color,i=u[u.map((function(e){return e.id})).indexOf(P.clickedCard[1])].color,t=u[u.map((function(e){return e.id})).indexOf(e.id)].color,o=JSON.parse(JSON.stringify(P));if(o.clickedCard.push(e.id),o.clickedCharacter=e.name,A(o),c===i&&i===t)n.push(P.clickedCard[0],P.clickedCard[1],e.id),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a r\xe9ussi \xe0 d\xe9masquer "+("Robin"===P.chosenCharacter?"le Sh\xe9riff et ses adjoints":"Robin et ses compagnons")])}));else{var l=JSON.parse(JSON.stringify(V));l[p?0:1].life=V[p?0:1].life-1,D(l),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" n'a pas r\xe9ussi \xe0 d\xe9masquer "+("Robin"===P.chosenCharacter?"le Sh\xe9riff et ses adjoints":"Robin et ses compagnons")+" et a perdu une vie"])}))}}}else if(0===P.clickedCard.length&&!O(e.id,n)){r((function(a){return[].concat(Object(s.a)(a),[e.id])}));var h=JSON.parse(JSON.stringify(P));h.clickedCard=[e.id],h.clickedCharacter=e.name,A(h),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a retourn\xe9 une carte"])}))}}else if(0===P.clickedCard.length){var m=JSON.parse(JSON.stringify(P));m.clickedCard=[e.id],m.clickedCharacter=e.name,A(m)}else{var f=JSON.parse(JSON.stringify(u)),j=f.map((function(e){return e.id})).indexOf(P.clickedCard[0]),b=f.map((function(e){return e.id})).indexOf(e.id),v=f[j],C=f[b];f[j]=C,f[b]=v,d(f);var g=JSON.parse(JSON.stringify(P));g.clickedCard=[g.clickedCard[0],e.id],A(g),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a \xe9chang\xe9 deux cartes"])}))}else{r((function(a){return[].concat(Object(s.a)(a),[e.id])}));var k=JSON.parse(JSON.stringify(P));k.clickedCard=[e.id],k.clickedCharacter=e.name,A(k);var S=JSON.parse(JSON.stringify(V));S[p?0:1].life=V[p?0:1].life-1,D(S),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a perdu une vie \xe0 cause du traitre"])}))}if(O(e.id,n)&&F()&&O(e.id,P.clickedCard))r(n.filter((function(a){return a!==e.id}))),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a remis une carte face cach\xe9e"])}));else if(O(e.id,n)&&12===e.id)r(n.filter((function(a){return a!==e.id}))),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a remis une carte face cach\xe9e"])}));else if(O(e.id,n)&&O(e.id,P.clickedCard))r(n.filter((function(a){return a!==e.id}))),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a remis une carte face cach\xe9e"])}));else if(O(e.id,n)||!F()||O(P.clickedCard[0],n))"Moine"===P.chosenCharacter&&(r((function(a){return[].concat(Object(s.a)(a),[e.id])})),G(!0),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a retourn\xe9 une carte gr\xe2ce au moine"])})));else{r((function(a){return[].concat(Object(s.a)(a),[e.id])}));var x=JSON.parse(JSON.stringify(P));x.clickedCard=[e.id],x.clickedCharacter=e.name,A(x),N((function(e){return[].concat(Object(s.a)(e),[V[p?0:1].name+" a retourn\xe9 une carte gr\xe2ce \xe0 la sorci\xe8re"])}))}},characters:u,activeCard:n,activePlayer:p,round:P}),Object(C.jsx)(S,{onChoiceClick:H,onAnswerClick:K,activePlayer:!p,player:!1,round:P}),Object(C.jsx)(k,{players:V,player:!1,onChange:Q,onMenuClick:W})]})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(a){var n=a.getCLS,c=a.getFID,r=a.getFCP,i=a.getLCP,t=a.getTTFB;n(e),c(e),r(e),i(e),t(e)}))};t.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(q,{})}),document.getElementById("root")),M()}},[[18,1,2]]]);
//# sourceMappingURL=main.de2f53f0.chunk.js.map