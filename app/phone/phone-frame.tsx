"use client";
import {useEffect,useRef,useState} from "react";
export function BananaPhone(){
 const frame=useRef<HTMLIFrameElement>(null);const [height,setHeight]=useState(3600);
 useEffect(()=>{function receive(event:MessageEvent){if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;const d=event.data;if(d?.type==='banana-phone-height'&&Number.isFinite(d.height))setHeight(Math.max(800,Math.min(30000,d.height)));if(d?.type==='banana-phone-scroll'&&Number.isFinite(d.top)){const top=frame.current!.getBoundingClientRect().top+scrollY+d.top-90;window.scrollTo({top:Math.max(0,top),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}window.addEventListener('message',receive);frame.current?.contentWindow?.postMessage({type:'banana-phone-measure'},location.origin);return()=>window.removeEventListener('message',receive);},[]);
 return <iframe ref={frame} src="/banana-phone/index.html" title="BananaPhone Ω — 発信・電話帳・熟度・仕様" style={{display:'block',width:'100%',height,border:0}}/>;
}
