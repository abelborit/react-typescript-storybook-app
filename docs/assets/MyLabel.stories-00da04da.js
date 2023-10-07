import{j as L}from"./jsx-runtime-ffb262ed.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const l=({label:s,isCapitalize:g=!1,size:q="normal",color:z,fontColor:v,...h})=>L.jsx("span",{className:`${q} ${z} label`,style:{color:v},...h,children:g?s.toUpperCase():s});try{l.displayName="MyLabel",l.__docgenInfo={description:"",displayName:"MyLabel",props:{label:{defaultValue:null,description:"Text to show",name:"label",required:!0,type:{name:"string"}},size:{defaultValue:{value:"normal"},description:"Component size",name:"size",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'}]}},isCapitalize:{defaultValue:{value:"false"},description:"Capitalize all letters",name:"isCapitalize",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"Label color",name:"color",required:!1,type:{name:"enum",value:[{value:'"text-primary"'},{value:'"text-secondary"'},{value:'"text-tertiary"'}]}},fontColor:{defaultValue:null,description:"Font color",name:"fontColor",required:!1,type:{name:"string"}}}}}catch{}const M={title:"My_Components/UI/MyLabel",component:l,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{size:{control:"inline-radio"},fontColor:{control:"color"}}},e={args:{label:"Basic Label",size:"normal"}},a={args:{label:"All Caps Label",size:"h2",isCapitalize:!0}},o={args:{label:"Secondary Label",size:"h3",color:"text-secondary"}},r={args:{label:"Custom Color Label",size:"h2",fontColor:"gray"}};var n,t,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  /* definir los args del componente. Tener en cuanta que cuando son propiedades obligatorias entonces se tiene que colocar porque sino dará un error, las que son propiedades opcionales se pueden colocar o no */
  /* algo a tener en cuenta es que por el momento storybook no lee todo lo que está dentro de las interfaces, es decir, solo toma las propiedades requeridas y las opcionales no las toma en cuenta, entonces hay que cancelar el servidor y volver a levantarlo en la terminal para que tome todo lo de las interfaces, sería como un pequeño bug que tiene con las interfaces pero esto funciona mejor con los proptypes de JavaScript ya que ahí sí debería leer todo */
  args: {
    label: "Basic Label",
    size: "normal"
  }
}`,...(c=(t=e.parameters)==null?void 0:t.docs)==null?void 0:c.source}}};var i,p,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "All Caps Label",
    size: "h2",
    isCapitalize: true
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,m,y;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: "Secondary Label",
    size: "h3",
    color: "text-secondary"
  }
}`,...(y=(m=o.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var b,C,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Custom Color Label",
    size: "h2",
    fontColor: "gray"
  }
}`,...(f=(C=r.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};const V=["Basic","AllCaps","Secondary","CustomColor"];export{a as AllCaps,e as Basic,r as CustomColor,o as Secondary,V as __namedExportsOrder,M as default};
//# sourceMappingURL=MyLabel.stories-00da04da.js.map
