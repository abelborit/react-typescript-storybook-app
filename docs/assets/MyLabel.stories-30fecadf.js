import{j as B}from"./jsx-runtime-ffb262ed.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const n=({label:l,isCapitalize:v=!1,size:L="normal",color:k,fontColor:x,backgroundColor:_="transparent",...S})=>B.jsx("span",{className:`${L} ${k} label`,style:{color:x,backgroundColor:_},...S,children:v?l.toUpperCase():l});try{n.displayName="MyLabel",n.__docgenInfo={description:"",displayName:"MyLabel",props:{label:{defaultValue:null,description:"Text to show",name:"label",required:!0,type:{name:"string"}},size:{defaultValue:{value:"normal"},description:"Component size",name:"size",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'}]}},isCapitalize:{defaultValue:{value:"false"},description:"Capitalize all letters",name:"isCapitalize",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"Label color",name:"color",required:!1,type:{name:"enum",value:[{value:'"text-primary"'},{value:'"text-secondary"'},{value:'"text-tertiary"'}]}},fontColor:{defaultValue:null,description:"Font color",name:"fontColor",required:!1,type:{name:"string"}},backgroundColor:{defaultValue:{value:"transparent"},description:"Background color",name:"backgroundColor",required:!1,type:{name:"string"}}}}}catch{}const A={title:"My_Components/UI/MyLabel",component:n,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{size:{control:"inline-radio"},fontColor:{control:"color"},backgroundColor:{control:"color"}}},e={args:{label:"Basic Label",size:"normal"}},a={args:{label:"All Caps Label",size:"h2",isCapitalize:!0}},o={args:{label:"Secondary Label",size:"h3",color:"text-secondary"}},r={args:{label:"Custom Color Label",size:"h2",fontColor:"gray"}},s={args:{label:"Custom Background Color Label",size:"h2",fontColor:"white",backgroundColor:"gray"}};var t,c,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  /* definir los args del componente. Tener en cuanta que cuando son propiedades obligatorias entonces se tiene que colocar porque sino dará un error, las que son propiedades opcionales se pueden colocar o no */
  /* algo a tener en cuenta es que por el momento storybook no lee todo lo que está dentro de las interfaces, es decir, solo toma las propiedades requeridas y las opcionales no las toma en cuenta, entonces hay que cancelar el servidor y volver a levantarlo en la terminal para que tome todo lo de las interfaces, sería como un pequeño bug que tiene con las interfaces pero esto funciona mejor con los proptypes de JavaScript ya que ahí sí debería leer todo */
  args: {
    label: "Basic Label",
    size: "normal"
  }
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,d,p;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: "All Caps Label",
    size: "h2",
    isCapitalize: true
  }
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,g,C;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: "Secondary Label",
    size: "h3",
    color: "text-secondary"
  }
}`,...(C=(g=o.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var b,y,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Custom Color Label",
    size: "h2",
    fontColor: "gray"
  }
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var z,h,q;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: "Custom Background Color Label",
    size: "h2",
    fontColor: "white",
    backgroundColor: "gray"
  }
}`,...(q=(h=s.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};const w=["Basic","AllCaps","Secondary","CustomColor","CustomBackgroundColor"];export{a as AllCaps,e as Basic,s as CustomBackgroundColor,r as CustomColor,o as Secondary,w as __namedExportsOrder,A as default};
//# sourceMappingURL=MyLabel.stories-30fecadf.js.map
