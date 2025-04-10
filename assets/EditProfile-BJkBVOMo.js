import{r as i,u as D,F as W,j as e}from"./index-B0ZLWObH.js";import{g as B,u as E}from"./localeStorageApi-BzC0sAnb.js";import{f as J,u as z,h as O}from"./registerAndLogin-srQY7G39.js";import{L as R}from"./Spinner-D0ySSmfI.js";import"./firebase-CLNeqrfC.js";const $="_editProfileContainer_1yp8s_1",q="_editProfileTitle_1yp8s_21",G="_editProfileForm_1yp8s_31",H="_editProfileLabel_1yp8s_43",K="_editProfileInput_1yp8s_55",Q="_editProfileTextarea_1yp8s_57",V="_editProfileSelect_1yp8s_59",X="_editProfileSaveButton_1yp8s_87",Y="_imageUploadContainer_1yp8s_123",Z="_coverPhotoLabel_1yp8s_139",ee="_profileImageLabel_1yp8s_141",te="_coverPhotoPreview_1yp8s_159",ae="_profileImagePreview_1yp8s_175",oe="_birthdateContainer_1yp8s_195",ie="_checkboxContainer_1yp8s_219",o={editProfileContainer:$,editProfileTitle:q,editProfileForm:G,editProfileLabel:H,editProfileInput:K,editProfileTextarea:Q,editProfileSelect:V,editProfileSaveButton:X,imageUploadContainer:Y,coverPhotoLabel:Z,profileImageLabel:ee,coverPhotoPreview:te,profileImagePreview:ae,birthdateContainer:oe,checkboxContainer:ie},pe=()=>{const[N,L]=i.useState(""),[r,k]=i.useState(""),[m,h]=i.useState(null),[f,w]=i.useState(null),[p,g]=i.useState(null),[x,U]=i.useState(null),[v,P]=i.useState(""),[b,y]=i.useState(""),[j,_]=i.useState(""),[n,c]=i.useState({day:"",month:"",year:""}),[d,C]=i.useState({connectWith:"",getMore:"",peronalizedAds:""}),A=D(),{formData:le,updateForm:F,resetFormData:se}=i.useContext(W),[M,I]=i.useState(!1);i.useEffect(()=>{(async()=>{const t=JSON.parse(B());L(t.name);const l=await J(t.name);k(l),console.log(r),P(t.name),y(t.email),_(t.bio||""),c(t.birthday||{day:"",month:"",year:""}),t.wallImg&&g(t.wallImg),t.profileImg&&h(t.profileImg),C({connectWith:t.checkbox.connectWith||"",getMore:t.checkbox.getMore||"",peronalizedAds:t.checkbox.peronalizedAds||""})})()},[r]);const S=(a,t,l)=>{const s=a.target.files[0];s&&(t(s),l(URL.createObjectURL(s)))},u=a=>{const{name:t,checked:l}=a.target;C(s=>({...s,[t]:l?"yes":"no"}))},T=async a=>{a.preventDefault(),I(!0);const t={name:v,email:b,bio:j,birthDay:n,preferences:d};F(t),await z(N,r,t,m,p);const l=await O(r);E(l),A("/react-regular-exam/welcome/profile"),I(!1)};return e.jsxs("div",{className:o.editProfileContainer,children:[M&&e.jsx(R,{}),e.jsx("h2",{className:o.editProfileTitle,children:"Edit Profile"}),e.jsxs("form",{onSubmit:T,className:o.editProfileForm,children:[e.jsxs("div",{className:o.imageUploadContainer,children:[e.jsxs("label",{className:o.coverPhotoLabel,children:["Cover Photo:",e.jsx("input",{type:"file",accept:"image/*",onChange:a=>S(a,g,U)}),p&&e.jsx("img",{src:x||p,alt:"Cover",className:o.coverPhotoPreview})]}),e.jsxs("label",{className:o.profileImageLabel,children:["Profile Image:",e.jsx("input",{type:"file",accept:"image/*",onChange:a=>S(a,h,w)}),m&&e.jsx("img",{src:f||m||"https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg",alt:"Profile",className:o.profileImagePreview})]})]}),e.jsxs("label",{className:o.editProfileLabel,children:["Name:",e.jsx("input",{type:"text",value:v||"",onChange:a=>P(a.target.value),className:o.editProfileInput})]}),e.jsxs("label",{className:o.editProfileLabel,children:["Email:",e.jsx("input",{type:"email",value:b||"",onChange:a=>y(a.target.value),className:o.editProfileInput})]}),e.jsxs("label",{className:o.editProfileLabel,children:["Bio:",e.jsx("textarea",{value:j||"",onChange:a=>_(a.target.value),className:o.editProfileTextarea})]}),e.jsxs("div",{className:o.birthdateContainer,children:[e.jsxs("select",{value:n.day||"",onChange:a=>c(t=>({...t,day:a.target.value})),className:o.editProfileSelect,children:[e.jsx("option",{value:""}),Array.from({length:31},(a,t)=>e.jsx("option",{value:t+1||"",children:t+1},t+1))]}),e.jsxs("select",{value:n.month||"",onChange:a=>c(t=>({...t,month:a.target.value})),className:o.editProfileSelect,children:[e.jsx("option",{value:""}),e.jsx("option",{value:"January",children:"January"}),e.jsx("option",{value:"February",children:"February"}),e.jsx("option",{value:"March",children:"March"}),e.jsx("option",{value:"April",children:"April"}),e.jsx("option",{value:"May",children:"May"}),e.jsx("option",{value:"June",children:"June"}),e.jsx("option",{value:"July",children:"July"}),e.jsx("option",{value:"August",children:"August"}),e.jsx("option",{value:"September",children:"September"}),e.jsx("option",{value:"October",children:"October"}),e.jsx("option",{value:"November",children:"November"}),e.jsx("option",{value:"December",children:"December"})]}),e.jsxs("select",{value:n.year||"",onChange:a=>c(t=>({...t,year:a.target.value})),className:o.editProfileSelect,children:[e.jsx("option",{value:""}),Array.from({length:121},(a,t)=>e.jsx("option",{value:t+1905||"",children:t+1905},t+1905))]})]}),e.jsxs("div",{className:o.checkboxContainer,children:[e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:"connectWith",checked:d.connectWith==="yes",onChange:a=>u(a)})," Connect"]}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:"getMore",checked:d.getMore==="yes",onChange:a=>u(a)})," More"]}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:"peronalizedAds",checked:d.peronalizedAds==="yes",onChange:a=>u(a)})," Ads"]})]}),e.jsx("button",{type:"submit",className:o.editProfileSaveButton,children:"Save"})]})]})};export{pe as default};
