import{b as k,r as c,u as B,j as t}from"./index-B0ZLWObH.js";import{g as _}from"./localeStorageApi-BzC0sAnb.js";import{a as b,c as h,d as w}from"./registerAndLogin-srQY7G39.js";import{v as D,u as S}from"./LikeHook-DBmL0K7U.js";import"./firebase-CLNeqrfC.js";const P="_post_1z0jj_1",E="_meta_1z0jj_17",H="_imgWrap_1z0jj_55",L="_feedback_1z0jj_93",U="_actions_1z0jj_119",R="_editButton_1z0jj_131",T="_deleteButton_1z0jj_131",W="_commentSection_1z0jj_165",O="_commentInput_1z0jj_179",J="_commentButton_1z0jj_195",A="_commentsContainer_1z0jj_215",F="_comment_1z0jj_165",Y="_commentHeader_1z0jj_253",$="_commentDate_1z0jj_289",q="_commentText_1z0jj_299",G="_noComments_1z0jj_309",s={post:P,meta:E,imgWrap:H,feedback:L,actions:U,editButton:R,deleteButton:T,commentSection:W,commentInput:O,commentButton:J,commentsContainer:A,comment:F,commentHeader:Y,commentDate:$,commentText:q,noComments:G};function K(){const d=JSON.parse(_()).name;return{handleComment:async(i,e)=>{const r=i.id,a={id:D(),author:d,text:e.current.value,date:new Date().toLocaleString()};return e.current.value="",a.text?(await b(r,a),a):alert("Your reply is empty!")}}}function tt(){var p;const j=k(),{handleComment:d}=K(),m=(p=j.state)==null?void 0:p.postId,i=c.useRef(),[e,r]=c.useState(null),[a,f]=c.useState([]),[g,N]=c.useState(!1),u=B(),{handleLike:C}=S();if(!m)return t.jsx("p",{children:"No post data found"});const v=async()=>{const n=await d(e,i);n&&f(o=>[...o,n])};c.useEffect(()=>{(async()=>{const o=await h(m);JSON.parse(_()).name===o.meta.author&&N(!0),r(o)})()},[a]);const y=async()=>{const n=e.id;w(n),u("/react-regular-exam/welcome")},z=()=>{e&&u(`/react-regular-exam/welcome/${e.id}/details/edit`,{state:{postData:e}})},I=async n=>{const x=n.target.closest("#closestId").getAttribute("data-id");await C(x);const l=await h(m);l&&r(l)};return t.jsxs(t.Fragment,{children:[e?t.jsxs("div",{id:"closestId","data-id":e.id,"data-imgid":e.imgId,className:s.post,children:[t.jsxs("div",{className:s.imgWrap,children:[t.jsxs("div",{className:s.meta,children:[t.jsx("img",{src:e.meta.img||e.meta.avatar||"https://example.com/default-avatar.jpg",alt:"Profile"}),t.jsx("h4",{children:e.meta.author}),t.jsx("p",{children:e.meta.date})]}),t.jsx("p",{children:e.content}),e.img&&t.jsx("img",{src:e.img,alt:""})]}),t.jsxs("div",{className:s.feedback,children:[t.jsxs("p",{children:[t.jsx("i",{className:"fa-regular fa-comment"}),t.jsx("span",{children:e.feedback.comments})]}),t.jsxs("p",{onClick:n=>I(n),children:[t.jsx("i",{className:"fa-regular fa-heart"}),t.jsx("span",{children:e.feedback.likes})]}),t.jsxs("p",{children:[t.jsx("i",{className:"fa-solid fa-magnifying-glass"}),t.jsx("span",{children:e.feedback.views})]})]}),g&&t.jsxs("div",{className:s.actions,children:[t.jsx("button",{className:s.editButton,onClick:()=>z(),children:"Edit"}),t.jsx("button",{className:s.deleteButton,onClick:()=>y(),children:"Delete"})]}),t.jsxs("div",{className:s.commentSection,children:[t.jsx("textarea",{ref:i,placeholder:"Post your reply",className:s.commentInput}),t.jsx("button",{className:s.commentButton,onClick:()=>v(),children:"Reply"})]})]},e.id):t.jsx("p",{children:"Loading post data..."}),e?t.jsx("div",{className:s.commentsContainer,children:e.comments&&e.comments.length>0?e.comments.map(n=>t.jsxs("div",{className:s.comment,children:[t.jsxs("div",{className:s.commentHeader,children:[t.jsx("h5",{children:n.data.author}),t.jsx("p",{className:s.commentDate,children:n.data.date})]}),t.jsx("p",{className:s.commentText,children:n.data.text})]},n.data.id)):t.jsx("p",{className:s.noComments,children:"No comments yet. Be the first to reply!"})}):t.jsx("p",{children:"Loading post data..."})]})}export{tt as default};
