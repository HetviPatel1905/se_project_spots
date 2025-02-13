!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t,r)=>{(e=>e.some((e=>!e.validity.valid)))(e)?n(t,r):(t.disabled=!1,t.classList.remove(r.inactiveButtonClass))},n=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},o=e=>{document.querySelectorAll(e.formSelector).forEach((n=>{((e,n)=>{const o=Array.from(e.querySelectorAll(n.inputSelector)),a=e.querySelector(n.submitButtonSelector);r(o,a,n),o.forEach((s=>{s.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{e.querySelector(`#${t.id}-error`).textContent=r,t.classList.add(n.inputErrorClass)})(e,r,r.validationMessage,n)})(e,s,n),r(o,a,n)}))}))})(n,e)}))};function a(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Save",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Saving...";e.textContent=t?n:r}o(e);const s=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}_checkResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{method:"GET",headers:this._headers}).then(this._checkResponse)}editUserInfo(e){let{name:t,about:r}=e;return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})}).then(this._checkResponse)}getNewCard(e){let{name:t,link:r}=e;return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})}).then(this._checkResponse)}setNewAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}handleLikeStatus(e,t){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers}).then(this._checkResponse)}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"387e9c57-78bd-45cf-b6d3-39b296708050","Content-Type":"application/json"}});s.getAppInfo().then((e=>{let[t,r]=e;t.forEach((e=>{const t=O(e);I.append(t)})),i.textContent=r.name,d.textContent=r.about,u.src=r.avatar,u.alt=r.name})).catch((e=>{console.error(e)}));const c=document.querySelector(".profile__edit-btn"),l=document.querySelector(".profile__add-btn"),i=document.querySelector(".profile__name"),d=document.querySelector(".profile__description"),u=document.querySelector(".profile__avatar"),m=document.querySelector(".profile__avatar-btn"),_=document.querySelector("#avatar-modal"),h=_.querySelector("#avatar-form"),f=_.querySelector("#profile-avatar-input"),p=_.querySelector(".modal__close-btn"),v=(_.querySelector("#modal__submit_avatar-btn"),document.querySelector("#profile-edit-modal")),y=v.querySelector(".modal__close-btn"),b=document.forms["profile-form"],S=v.querySelector("#profile-name-input"),k=v.querySelector("#profile-description-input"),q=document.querySelector("#profile-add-modal"),E=q.querySelector(".modal__close-btn"),L=document.forms["profile-add-form"],g=(q.querySelector(".modal__btn"),q.querySelector("#profile-add-image-input")),C=q.querySelector("#profile-add-caption-input"),U=document.querySelector("#preview-modal"),x=U.querySelector(".modal__image"),$=U.querySelector(".modal__caption"),w=U.querySelector(".modal__close-btn_type_preview"),A=document.querySelector("#card-template"),I=document.querySelector(".cards__list");let D,N;const R=document.querySelector("#delete-modal"),T=R.querySelector("#delete-form"),B=R.querySelector(".modal__close-btn"),P=document.getElementById("modal__submit-btn_type_cancel");function O(e){const t=A.content.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),o=t.querySelector(".card__like-btn"),a=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,n.addEventListener("click",(()=>{J(U),x.src=e.link,x.alt=e.name,$.textContent=e.name})),e.isLiked&&o.classList.toggle("card__like-btn_liked"),o.addEventListener("click",(t=>{!function(e,t){const r=e.target.classList.contains("card__like-btn_liked");s.handleLikeStatus(t,r).then((()=>{e.target.classList.toggle("card__like-btn_liked")})).catch(console.error)}(t,e._id)})),a.addEventListener("click",(r=>function(e,t){D=e,N=t,J(R)}(t,e._id))),t}function j(e){"Escape"===e.key&&z(document.querySelector(".modal_opened"))}function J(e){e.classList.add("modal_opened"),e.addEventListener("click",H),document.addEventListener("keydown",j)}function H(e){(e.target.contains="modal")&&z(e.target)}function z(e){e.classList.remove("modal_opened"),e.removeEventListener("click",H),document.removeEventListener("keydown",j)}c.addEventListener("click",(()=>{var r,n;S.value=i.textContent,k.value=d.textContent,r=b,n=e,[S,k].forEach((e=>{t(r,e,n)})),J(v)})),l.addEventListener("click",(()=>{J(q)})),m.addEventListener("click",(()=>{J(_)})),E.addEventListener("click",(()=>{z(q)})),y.addEventListener("click",(()=>{z(v)})),w.addEventListener("click",(()=>{z(U)})),p.addEventListener("click",(()=>{z(_)})),P.addEventListener("click",(()=>{z(R)})),B.addEventListener("click",(()=>{z(R)})),T.addEventListener("submit",(function(e){e.preventDefault();const t=e.submitter;t.textContent="Deleting...",s.deleteCard(N).then((()=>{D.remove(),z(R)})).catch((e=>{console.error("Error deleting card:",e)})).finally((()=>{t.textContent="Delete"}))})),b.addEventListener("submit",(function(e){e.preventDefault();const t=e.submitter;a(t,!0),s.editUserInfo({name:S.value,about:k.value}).then((e=>{i.textContent=e.name,d.textContent=e.about,z(v)})).catch(console.error).finally((()=>{a(t,!1)}))})),L.addEventListener("submit",(function(t){t.preventDefault();const r=t.submitter;console.log(r),a(r,!0),s.getNewCard({name:C.value,link:g.value}).then((o=>{const a=O(o);I.prepend(a),n(r,e),t.target.reset(),z(q)})).catch(console.error).finally((()=>{a(r,!1)}))})),h.addEventListener("submit",(function(t){t.preventDefault();const r=t.submitter;a(r,!0),s.setNewAvatar(f.value).then((o=>{u.src=o.avatar,n(r,e),t.target.reset(),z(_)})).catch(console.error).finally((()=>{a(r,!1)}))})),o(e)}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQWUwQyxHQUNuQ3pDLEVBQVVzRSxRQUFReEUsR0FFbEJsRSxFQUFjc0ksRUFBVzlKLEdBQ3pCOEksRUFBSUMsT0FBT29CLFFBQ1haLEVBQVduQyxFQUFnQixJQUU1QmpCLE1BQU1FLFFBQVFDLE9BQ2QwRCxTQUFRLEtBQ1B2SCxFQUFjcUgsR0FBVyxFQUFNLEdBRXJDLElBMEdBbkQsRUFBV3ZFLGlCQUFpQixVQXhHNUIsU0FBNEIwRyxHQUMxQkEsRUFBSWUsaUJBRUosTUFBTUMsRUFBWWhCLEVBQUlpQixVQUN0QnRILEVBQWNxSCxHQUFXLEdBRXpCN0csRUFDR2dDLGFBQWEyQixFQUFZZ0QsT0FDekJ2RixNQUFNZ0UsSUFDTHJDLEVBQWNDLElBQU1vQyxFQUFLbkQsT0FFekIxRCxFQUFjc0ksRUFBVzlKLEdBQ3pCOEksRUFBSUMsT0FBT29CLFFBQ1haLEVBQVc3QyxFQUFZLElBRXhCUCxNQUFNRSxRQUFRQyxPQUNkMEQsU0FBUSxLQUNQdkgsRUFBY3FILEdBQVcsRUFBTSxHQUVyQyxJQXVGQW5JLEVBQWlCM0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvc2NyaXB0cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3NlX3Byb2plY3Rfc3BvdHMvLi9zcmMvdXRpbHMvYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zdWJtaXQtYnRuXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG5fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcbn07XG5cbmNvbnN0IHNob3dJbnB1dEVycm9yID0gKGZvcm1FbCwgaW5wdXRFbCwgZXJyb3JNc2csIGNvbmZpZykgPT4ge1xuICBjb25zdCBlcnJvck1zZ0VsID0gZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XG4gIGVycm9yTXNnRWwudGV4dENvbnRlbnQgPSBlcnJvck1zZztcbiAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xufTtcblxuY29uc3QgaGlkZUlucHV0RXJyb3IgPSAoZm9ybUVsLCBpbnB1dEVsLCBjb25maWcpID0+IHtcbiAgY29uc3QgZXJyb3JNc2dFbCA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xuICBlcnJvck1zZ0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbnB1dEVycm9yQ2xhc3MpO1xufTtcblxuY29uc3QgY2hlY2tJbnB1dFZhbGlkaXR5ID0gKGZvcm1FbCwgaW5wdXRFbCwgY29uZmlnKSA9PiB7XG4gIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgIHNob3dJbnB1dEVycm9yKGZvcm1FbCwgaW5wdXRFbCwgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWwsIGlucHV0RWwsIGNvbmZpZyk7XG4gIH1cbn07XG5cbmNvbnN0IGhhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+IHtcbiAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dCkgPT4ge1xuICAgIHJldHVybiAhaW5wdXQudmFsaWRpdHkudmFsaWQ7XG4gIH0pO1xufTtcblxuY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbCwgY29uZmlnKSA9PiB7XG4gIGlmIChoYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgIGRpc2FibGVCdXR0b24oYnV0dG9uRWwsIGNvbmZpZyk7XG4gIH0gZWxzZSB7XG4gICAgYnV0dG9uRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBidXR0b25FbC5jbGFzc0xpc3QucmVtb3ZlKGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRpc2FibGVCdXR0b24gPSAoYnV0dG9uRWwsIGNvbmZpZykgPT4ge1xuICBidXR0b25FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGJ1dHRvbkVsLmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWwsIGlucHV0TGlzdCwgY29uZmlnKSA9PiB7XG4gIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbCwgaW5wdXQsIGNvbmZpZyk7XG4gIH0pO1xufTtcblxuY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsLCBjb25maWcpID0+IHtcbiAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShmb3JtRWwucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3RvcikpO1xuICBjb25zdCBidXR0b25FbGVtZW50ID0gZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcblxuICB0b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQsIGNvbmZpZyk7XG5cbiAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tJbnB1dFZhbGlkaXR5KGZvcm1FbCwgaW5wdXRFbGVtZW50LCBjb25maWcpO1xuICAgICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBmb3JtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3Rvcik7XG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgIHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbCwgY29uZmlnKTtcbiAgfSk7XG59O1xuXG5lbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzZXRCdXR0b25UZXh0KFxuICBidG4sXG4gIGlzTG9hZGluZyxcbiAgZGVmYXVsdFRleHQgPSBcIlNhdmVcIixcbiAgbG9hZGluZ1RleHQgPSBcIlNhdmluZy4uLlwiXG4pIHtcbiAgaWYgKGlzTG9hZGluZykge1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IGxvYWRpbmdUZXh0O1xuICB9IGVsc2Uge1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IGRlZmF1bHRUZXh0O1xuICB9XG59XG4iLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG5pbXBvcnQge1xuICBlbmFibGVWYWxpZGF0aW9uLFxuICBzZXR0aW5ncyxcbiAgcmVzZXRWYWxpZGF0aW9uLFxuICBkaXNhYmxlQnV0dG9uLFxufSBmcm9tIFwiLi4vc2NyaXB0cy92YWxpZGF0aW9uLmpzXCI7XG5cbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL2FwaS5qc1wiO1xuaW1wb3J0IHsgc2V0QnV0dG9uVGV4dCB9IGZyb20gXCIuLi91dGlscy9oZWxwZXJzLmpzXCI7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcIjM4N2U5YzU3LTc4YmQtNDVjZi1iNmQzLTM5YjI5NjcwODA1MFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmFwaVxuICAuZ2V0QXBwSW5mbygpXG4gIC50aGVuKChbY2FyZHMsIHVzZXJzXSkgPT4ge1xuICAgIGNhcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZ2V0Q2FyZEVsZW1lbnQoaXRlbSk7XG4gICAgICBjYXJkc0xpc3QuYXBwZW5kKGNhcmRFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlcnMubmFtZTtcbiAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB1c2Vycy5hYm91dDtcbiAgICBwcm9maWxlQXZhdGFyLnNyYyA9IHVzZXJzLmF2YXRhcjtcbiAgICBwcm9maWxlQXZhdGFyLmFsdCA9IHVzZXJzLm5hbWU7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9KTtcblxuLy8gcHJvZmlsZVxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnRuXCIpO1xuY29uc3QgcHJvZmlsZUFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ0blwiKTtcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHByb2ZpbGVBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcblxuLy8gYXZhdGFyXG5cbmNvbnN0IGF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyLWJ0blwiKTtcbmNvbnN0IGF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XG5jb25zdCBhdmF0YXJGb3JtID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItZm9ybVwiKTtcbmNvbnN0IGF2YXRhcklucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcbmNvbnN0IGF2YXRhckNsb3NlQnV0dG9uID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuY29uc3QgYXZhdGFyU3VibWl0QnV0dG9uID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcbiAgXCIjbW9kYWxfX3N1Ym1pdF9hdmF0YXItYnRuXCJcbik7XG5cbi8vIEVkaXQgZm9ybXNcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiKTtcbmNvbnN0IHByb2ZpbGVFZGl0TW9kYWxDbG9zZUJ0biA9XG4gIHByb2ZpbGVFZGl0TW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcInByb2ZpbGUtZm9ybVwiXTtcbmNvbnN0IHByb2ZpbGVFZGl0TmFtZUlucHV0ID0gcHJvZmlsZUVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLW5hbWUtaW5wdXRcIlxuKTtcbmNvbnN0IHByb2ZpbGVFZGl0RGVzY3JpcHRvbklucHV0ID0gcHJvZmlsZUVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcbik7XG5cbi8vIGFkZCBjYXJkIGZvcm1cbmNvbnN0IHByb2ZpbGVBZGRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtbW9kYWxcIik7XG5jb25zdCBwcm9maWxlQWRkTW9kYWxDbG9zZUJ0biA9XG4gIHByb2ZpbGVBZGRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jbG9zZS1idG5cIik7XG5jb25zdCBjYXJkQWRkRm9ybSA9IGRvY3VtZW50LmZvcm1zW1wicHJvZmlsZS1hZGQtZm9ybVwiXTtcbmNvbnN0IGNhcmRTdWJtaXRCdXR0b24gPSBwcm9maWxlQWRkTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fYnRuXCIpO1xuY29uc3QgcHJvZmlsZUFkZEltYWdlSW5wdXQgPSBwcm9maWxlQWRkTW9kYWwucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1hZGQtaW1hZ2UtaW5wdXRcIlxuKTtcbmNvbnN0IHByb2ZpbGVBZGRDYXB0aW9uSW5wdXQgPSBwcm9maWxlQWRkTW9kYWwucXVlcnlTZWxlY3RvcihcbiAgXCIjcHJvZmlsZS1hZGQtY2FwdGlvbi1pbnB1dFwiXG4pO1xuXG5jb25zdCBwcmV2aWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XG5jb25zdCBwcmV2aWV3TW9kYWxJbWFnZSA9IHByZXZpZXdNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcbmNvbnN0IHByZXZpZXdNb2RhbENhcHRpb24gPSBwcmV2aWV3TW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2FwdGlvblwiKTtcbmNvbnN0IHByZXZpZXdDbG9zZUJ1dHRvbiA9IHByZXZpZXdNb2RhbC5xdWVyeVNlbGVjdG9yKFxuICBcIi5tb2RhbF9fY2xvc2UtYnRuX3R5cGVfcHJldmlld1wiXG4pO1xuXG4vLyBjYXJkXG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGVtcGxhdGVcIik7XG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xubGV0IHNlbGVjdGVkQ2FyZDtcbmxldCBzZWxlY3RlZENhcmRJZDtcblxuLy8gZGVsZXRlIGNhcmRcbmNvbnN0IGRlbGV0ZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtbW9kYWxcIik7XG5jb25zdCBkZWxldGVGb3JtID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtZm9ybVwiKTtcbmNvbnN0IGRlbGV0ZUNsb3NlQnV0dG9uID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xuY29uc3QgZGVsZXRlQ2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibW9kYWxfX3N1Ym1pdC1idG5fdHlwZV9jYW5jZWxcIlxuKTtcblxuZnVuY3Rpb24gZ2V0Q2FyZEVsZW1lbnQoZGF0YSkge1xuICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5jb250ZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgY29uc3QgY2FyZE5hbWVFbCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gIGNvbnN0IGNhcmRJbWFnZUVsID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgY29uc3QgY2FyZExpa2VCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnRuXCIpO1xuICBjb25zdCBjYXJkRGVsZXRlQnRuID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnRuXCIpO1xuXG4gIGNhcmROYW1lRWwudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gIGNhcmRJbWFnZUVsLnNyYyA9IGRhdGEubGluaztcbiAgY2FyZEltYWdlRWwuYWx0ID0gZGF0YS5uYW1lO1xuXG4gIGNhcmRJbWFnZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3Blbk1vZGFsKHByZXZpZXdNb2RhbCk7XG4gICAgcHJldmlld01vZGFsSW1hZ2Uuc3JjID0gZGF0YS5saW5rO1xuICAgIHByZXZpZXdNb2RhbEltYWdlLmFsdCA9IGRhdGEubmFtZTtcbiAgICBwcmV2aWV3TW9kYWxDYXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICB9KTtcblxuICBpZiAoZGF0YS5pc0xpa2VkKSB7XG4gICAgY2FyZExpa2VCdG4uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xuICB9XG5cbiAgY2FyZExpa2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IHtcbiAgICBoYW5kbGVMaWtlKGV2dCwgZGF0YS5faWQpO1xuICB9KTtcblxuICBjYXJkRGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PlxuICAgIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGRhdGEuX2lkKVxuICApO1xuXG4gIHJldHVybiBjYXJkRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgY29uc3QgbW9kYWxPcGVuZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX29wZW5lZFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsT3BlbmVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcbiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWxCeU92ZXJsYXkpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NDbG9zZSk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWxCeU92ZXJsYXkoZXZ0KSB7XG4gIGlmICgoZXZ0LnRhcmdldC5jb250YWlucyA9IFwibW9kYWxcIikpIGNsb3NlTW9kYWwoZXZ0LnRhcmdldCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWxCeU92ZXJsYXkpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NDbG9zZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICBzZXRCdXR0b25UZXh0KHN1Ym1pdEJ0biwgdHJ1ZSk7XG5cbiAgYXBpXG4gICAgLmVkaXRVc2VySW5mbyh7XG4gICAgICBuYW1lOiBwcm9maWxlRWRpdE5hbWVJbnB1dC52YWx1ZSxcbiAgICAgIGFib3V0OiBwcm9maWxlRWRpdERlc2NyaXB0b25JbnB1dC52YWx1ZSxcbiAgICB9KVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgICBjbG9zZU1vZGFsKHByb2ZpbGVFZGl0TW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc2V0QnV0dG9uVGV4dChzdWJtaXRCdG4sIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUFkZFN1Ym1pdChldnQpIHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3Qgc3VibWl0QnRuID0gZXZ0LnN1Ym1pdHRlcjtcbiAgY29uc29sZS5sb2coc3VibWl0QnRuKTtcbiAgc2V0QnV0dG9uVGV4dChzdWJtaXRCdG4sIHRydWUpO1xuXG4gIGFwaVxuICAgIC5nZXROZXdDYXJkKHtcbiAgICAgIG5hbWU6IHByb2ZpbGVBZGRDYXB0aW9uSW5wdXQudmFsdWUsXG4gICAgICBsaW5rOiBwcm9maWxlQWRkSW1hZ2VJbnB1dC52YWx1ZSxcbiAgICB9KVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBjYXJkRWxlbWVudCA9IGdldENhcmRFbGVtZW50KGRhdGEpO1xuICAgICAgY2FyZHNMaXN0LnByZXBlbmQoY2FyZEVsZW1lbnQpO1xuXG4gICAgICBkaXNhYmxlQnV0dG9uKHN1Ym1pdEJ0biwgc2V0dGluZ3MpO1xuICAgICAgZXZ0LnRhcmdldC5yZXNldCgpO1xuICAgICAgY2xvc2VNb2RhbChwcm9maWxlQWRkTW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc2V0QnV0dG9uVGV4dChzdWJtaXRCdG4sIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQXZhdGFyU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICBzZXRCdXR0b25UZXh0KHN1Ym1pdEJ0biwgdHJ1ZSk7XG5cbiAgYXBpXG4gICAgLnNldE5ld0F2YXRhcihhdmF0YXJJbnB1dC52YWx1ZSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcHJvZmlsZUF2YXRhci5zcmMgPSBkYXRhLmF2YXRhcjtcblxuICAgICAgZGlzYWJsZUJ1dHRvbihzdWJtaXRCdG4sIHNldHRpbmdzKTtcbiAgICAgIGV2dC50YXJnZXQucmVzZXQoKTtcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc2V0QnV0dG9uVGV4dChzdWJtaXRCdG4sIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlU3VibWl0KGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xuICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIkRlbGV0aW5nLi4uXCI7XG5cbiAgYXBpXG4gICAgLmRlbGV0ZUNhcmQoc2VsZWN0ZWRDYXJkSWQpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpO1xuICAgICAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGNhcmQ6XCIsIGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlKGV2dCwgaWQpIHtcbiAgY29uc3QgaXNMaWtlZCA9IGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG5cbiAgYXBpXG4gICAgLmhhbmRsZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idG5fbGlrZWRcIik7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNhcmQoY2FyZEVsZW1lbnQsIGRhdGFJZCkge1xuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcbiAgc2VsZWN0ZWRDYXJkSWQgPSBkYXRhSWQ7XG4gIG9wZW5Nb2RhbChkZWxldGVNb2RhbCk7XG59XG5cbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHByb2ZpbGVFZGl0TmFtZUlucHV0LnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XG4gIHByb2ZpbGVFZGl0RGVzY3JpcHRvbklucHV0LnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICByZXNldFZhbGlkYXRpb24oXG4gICAgcHJvZmlsZUZvcm0sXG4gICAgW3Byb2ZpbGVFZGl0TmFtZUlucHV0LCBwcm9maWxlRWRpdERlc2NyaXB0b25JbnB1dF0sXG4gICAgc2V0dGluZ3NcbiAgKTtcbiAgb3Blbk1vZGFsKHByb2ZpbGVFZGl0TW9kYWwpO1xufSk7XG5cbnByb2ZpbGVBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3Blbk1vZGFsKHByb2ZpbGVBZGRNb2RhbCk7XG59KTtcblxuYXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG9wZW5Nb2RhbChhdmF0YXJNb2RhbCk7XG59KTtcblxucHJvZmlsZUFkZE1vZGFsQ2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xvc2VNb2RhbChwcm9maWxlQWRkTW9kYWwpO1xufSk7XG5cbnByb2ZpbGVFZGl0TW9kYWxDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjbG9zZU1vZGFsKHByb2ZpbGVFZGl0TW9kYWwpO1xufSk7XG5cbnByZXZpZXdDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjbG9zZU1vZGFsKHByZXZpZXdNb2RhbCk7XG59KTtcblxuYXZhdGFyQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xvc2VNb2RhbChhdmF0YXJNb2RhbCk7XG59KTtcblxuZGVsZXRlQ2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xufSk7XG5cbmRlbGV0ZUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xufSk7XG5cbmRlbGV0ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVEZWxldGVTdWJtaXQpO1xucHJvZmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdCk7XG5jYXJkQWRkRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVByb2ZpbGVBZGRTdWJtaXQpO1xuYXZhdGFyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUF2YXRhclN1Ym1pdCk7XG5cbmVuYWJsZVZhbGlkYXRpb24oc2V0dGluZ3MpO1xuIiwiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIF9jaGVja1Jlc3BvbnNlKHJlcykge1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cblxuICBnZXRBcHBJbmZvKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZWRpdFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIC8vIFNlbmQgdGhlIGRhdGEgaW4gdGhlIGJvZHkgYXMgYSBKU09OIHN0cmluZy5cbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWJvdXQsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0TmV3Q2FyZCh7IG5hbWUsIGxpbmsgfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsaW5rLFxuICAgICAgfSksXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHNldE5ld0F2YXRhcihhdmF0YXIpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhdmF0YXIsXG4gICAgICB9KSxcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcbiAgfVxuXG4gIGhhbmRsZUxpa2VTdGF0dXMoaWQsIGlzTGlrZWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6IGlzTGlrZWQgPyBcIkRFTEVURVwiIDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iXSwibmFtZXMiOlsic2V0dGluZ3MiLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImhpZGVJbnB1dEVycm9yIiwiZm9ybUVsIiwiaW5wdXRFbCIsImNvbmZpZyIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJpbnB1dExpc3QiLCJidXR0b25FbCIsInNvbWUiLCJpbnB1dCIsInZhbGlkaXR5IiwidmFsaWQiLCJoYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlQnV0dG9uIiwiZGlzYWJsZWQiLCJhZGQiLCJlbmFibGVWYWxpZGF0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwiYnV0dG9uRWxlbWVudCIsImlucHV0RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja0lucHV0VmFsaWRpdHkiLCJzaG93SW5wdXRFcnJvciIsImVycm9yTXNnIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJzZXRCdXR0b25UZXh0IiwiYnRuIiwiaXNMb2FkaW5nIiwiZGVmYXVsdFRleHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJsb2FkaW5nVGV4dCIsImFwaSIsImNvbnN0cnVjdG9yIiwiX3JlZiIsImJhc2VVcmwiLCJoZWFkZXJzIiwidGhpcyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJfY2hlY2tSZXNwb25zZSIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRBcHBJbmZvIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0VXNlckluZm8iLCJmZXRjaCIsInRoZW4iLCJtZXRob2QiLCJlZGl0VXNlckluZm8iLCJfcmVmMiIsIm5hbWUiLCJhYm91dCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0TmV3Q2FyZCIsIl9yZWYzIiwibGluayIsInNldE5ld0F2YXRhciIsImF2YXRhciIsImRlbGV0ZUNhcmQiLCJoYW5kbGVMaWtlU3RhdHVzIiwiaXNMaWtlZCIsImF1dGhvcml6YXRpb24iLCJjYXJkcyIsInVzZXJzIiwiaXRlbSIsImNhcmRFbGVtZW50IiwiZ2V0Q2FyZEVsZW1lbnQiLCJjYXJkc0xpc3QiLCJhcHBlbmQiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVBdmF0YXIiLCJzcmMiLCJhbHQiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInByb2ZpbGVFZGl0QnV0dG9uIiwicHJvZmlsZUFkZEJ1dHRvbiIsImF2YXRhckJ1dHRvbiIsImF2YXRhck1vZGFsIiwiYXZhdGFyRm9ybSIsImF2YXRhcklucHV0IiwiYXZhdGFyQ2xvc2VCdXR0b24iLCJwcm9maWxlRWRpdE1vZGFsIiwicHJvZmlsZUVkaXRNb2RhbENsb3NlQnRuIiwicHJvZmlsZUZvcm0iLCJmb3JtcyIsInByb2ZpbGVFZGl0TmFtZUlucHV0IiwicHJvZmlsZUVkaXREZXNjcmlwdG9uSW5wdXQiLCJwcm9maWxlQWRkTW9kYWwiLCJwcm9maWxlQWRkTW9kYWxDbG9zZUJ0biIsImNhcmRBZGRGb3JtIiwicHJvZmlsZUFkZEltYWdlSW5wdXQiLCJwcm9maWxlQWRkQ2FwdGlvbklucHV0IiwicHJldmlld01vZGFsIiwicHJldmlld01vZGFsSW1hZ2UiLCJwcmV2aWV3TW9kYWxDYXB0aW9uIiwicHJldmlld0Nsb3NlQnV0dG9uIiwiY2FyZFRlbXBsYXRlIiwic2VsZWN0ZWRDYXJkIiwic2VsZWN0ZWRDYXJkSWQiLCJkZWxldGVNb2RhbCIsImRlbGV0ZUZvcm0iLCJkZWxldGVDbG9zZUJ1dHRvbiIsImRlbGV0ZUNhbmNlbEJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwiZGF0YSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJjYXJkTmFtZUVsIiwiY2FyZEltYWdlRWwiLCJjYXJkTGlrZUJ0biIsImNhcmREZWxldGVCdG4iLCJvcGVuTW9kYWwiLCJ0b2dnbGUiLCJldnQiLCJ0YXJnZXQiLCJjb250YWlucyIsImhhbmRsZUxpa2UiLCJfaWQiLCJkYXRhSWQiLCJoYW5kbGVEZWxldGVDYXJkIiwiaGFuZGxlRXNjQ2xvc2UiLCJrZXkiLCJjbG9zZU1vZGFsIiwibW9kYWwiLCJjbG9zZU1vZGFsQnlPdmVybGF5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlc2V0VmFsaWRhdGlvbiIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRCdG4iLCJzdWJtaXR0ZXIiLCJmaW5hbGx5IiwibG9nIiwicHJlcGVuZCIsInJlc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==