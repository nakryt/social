(this.webpackJsonpsocial=this.webpackJsonpsocial||[]).push([[3],{242:function(e,t,n){e.exports={root:"Users_root__29z7y",loading:"Users_loading__3yfh7",arrow:"Users_arrow__35o6I"}},243:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function s(e){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){return!t||"object"!==s(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}n.r(t);var u=n(0),f=n.n(u),m=n(15),p=n(92),d=n(37),b=n(12),v=n(220),h=n(231),y=n(233),g=n(13),w=Object(g.a)(f.a.createElement(f.a.Fragment,null,f.a.createElement("path",{d:"M15.5 5H11l5 7-5 7h4.5l5-7z"}),f.a.createElement("path",{d:"M8.5 5H4l5 7-5 7h4.5l5-7z"})),"DoubleArrow"),O=n(242),E=n.n(O),j=n(46),N=n(1),_=n(3),k=(n(7),n(4)),S=n(165),x=n(6),z=u.forwardRef((function(e,t){var n=e.classes,a=e.className,r=e.raised,o=void 0!==r&&r,c=Object(_.a)(e,["classes","className","raised"]);return u.createElement(S.a,Object(N.a)({className:Object(k.a)(n.root,a),elevation:o?8:1,ref:t},c))})),R=Object(x.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(z),I=n(241),U=n(166),C=n(164),D=n(171),P=Object(C.a)((function(e){return Object(D.a)({root:{display:"flex",padding:e.spacing(2),marginRight:e.spacing(1),marginBottom:e.spacing(2)},avatarWrap:{display:"flex",flexDirection:"column",alignItems:"center",minWidth:120,marginRight:e.spacing(2),"& button":{padding:"2px 8px"}},avatar:{width:e.spacing(10),height:e.spacing(10),marginBottom:e.spacing(2)},name:{fontSize:"1.2rem",fontWeight:500,marginBotton:e.spacing(2)},status:{fontSize:"0.9rem",marginBottom:e.spacing(1)},info:{display:"flex",flexDirection:"column"}})})),W=function(e){var t=e.name,n=e.status,a=e.avatar,r=e.uniqueUrlName,o=e.followed,c=e.userId,i=P(),s=Object(m.c)(),l=Object(m.d)(p.a);return f.a.createElement(R,{className:i.root},f.a.createElement("div",{className:i.avatarWrap},f.a.createElement(j.b,{to:"/profile/".concat(c)},f.a.createElement(I.a,{className:i.avatar,src:a||void 0})),f.a.createElement(U.a,{variant:"contained",color:"primary",disabled:l.some((function(e){return e===c})),onClick:function(){c&&function(e){s(Object(d.k)(e))}(c)}},o?"unfollow":"follow")),f.a.createElement("div",{className:i.info},f.a.createElement("span",{className:i.status},c),f.a.createElement("span",{className:i.status},n||"No status"),f.a.createElement("span",{className:i.name},t||"No name"),f.a.createElement("span",null,r)))},B=function(e){var t=e.loading,n=e.users,a=Object(m.c)(),r=Object(u.useRef)(null),o=Object(u.useState)(!1),c=Object(b.a)(o,2),i=c[0],s=c[1],l=Object(u.useCallback)((function(){if(!t){var e=r.current;e&&e.offsetHeight<=Number(window.scrollY)+750&&a(Object(d.l)())}}),[r,a,t]);Object(u.useEffect)((function(){return window.addEventListener("scroll",l),function(){window.removeEventListener("scroll",l)}}),[a,t,l]);var p=Object(u.useCallback)((function(){window.scrollY>500?s(!0):s(!1)}),[]);Object(u.useEffect)((function(){return window.addEventListener("scroll",p),function(){window.removeEventListener("scroll",p)}}),[p]);return f.a.createElement("div",{ref:r,className:E.a.root},f.a.createElement(v.a,{in:i},f.a.createElement(w,{fontSize:"large",color:"primary",className:E.a.arrow,onClick:function(){window.scrollTo({top:0})}})),(null===n||void 0===n?void 0:n.length)?f.a.createElement(y.a,{container:!0},null===n||void 0===n?void 0:n.map((function(e){var t=e.name,n=e.status,a=e.photos.small,r=e.uniqueUrlName,o=e.id,c=e.followed;return f.a.createElement(y.a,{item:!0,xs:12,sm:12,md:6,key:o},f.a.createElement(W,{userId:o,name:t,status:n,avatar:a,uniqueUrlName:r,followed:c}))})),f.a.createElement("div",{className:E.a.loading},t&&f.a.createElement(h.a,{size:50}))):f.a.createElement(h.a,{size:120}))},L=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(p,e);var t,n,s,u,m=(t=p,function(){var e,n=c(t);if(i()){var a=c(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return l(this,e)});function p(){var e;a(this,p);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=m.call.apply(m,[this].concat(n))).state={users:[]},e}return n=p,(s=[{key:"componentDidMount",value:function(){this.state.users.length||this.props.initialization()}},{key:"componentDidUpdate",value:function(e,t){var n;e.usersItems!==this.props.usersItems&&(null===(n=this.props.usersItems)||void 0===n?void 0:n.length)&&this.setState({users:this.props.usersItems})}},{key:"componentWillUnmount",value:function(){this.props.unmount()}},{key:"render",value:function(){return f.a.createElement(B,{loading:this.props.loading,users:this.state.users})}}])&&r(n.prototype,s),u&&r(n,u),p}(u.Component);t.default=Object(m.b)((function(e){return{loading:Object(p.b)(e),usersItems:Object(p.c)(e)}}),(function(e){return{initialization:function(){return e(Object(d.j)())},unmount:function(){return e(Object(d.m)())}}}))(L)}}]);
//# sourceMappingURL=3.1246c1ce.chunk.js.map