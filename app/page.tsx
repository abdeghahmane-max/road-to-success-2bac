 "use client";
import {useEffect,useState} from "react";
import {supabase} from "../lib/supabase";
export default function Home(){
 const [years,setYears]=useState<number[]>([]); const [email,setEmail]=useState("");
 useEffect(()=>{supabase().auth.getUser().then(({data})=>setEmail(data.user?.email||""));supabase().from("exams").select("year").eq("subject","Physique-Chimie").then(({data})=>setYears([...new Set((data||[]).map(x=>x.year))].sort((a,b)=>b-a)))},[]);
 async function logout(){await supabase().auth.signOut();location.reload()}
 return <><header><div className="brand"><span>RTS</span><b>ROAD TO SUCCESS</b><small>2 BAC SPC</small></div><nav>{email?<><span>{email}</span><button onClick={logout}>Déconnexion</button></>:<a href="/login">Se connecter</a>}</nav></header>
 <main><section className="hero"><p className="eyebrow">ESPACE ÉLÈVE</p><h1>Travaille. Progresse.<br/><em>Réussis.</em></h1><p>Ton espace de préparation au Bac : examens nationaux, séries, exercices et suivi de progression.</p>
 <div className="cards"><a className="card" href="#examens">📝<b>Examens Nationaux</b><small>Physique-Chimie · 2016–2026</small></a><a className="card dim" href="#">📚<b>Séries & Exercices</b><small>Bientôt disponible</small></a><a className="card dim" href="#">📊<b>Ma progression</b><small>Maths · Physique-Chimie</small></a></div></section>
 <section id="examens"><h2>Examens Nationaux</h2><p className="sub">Physique-Chimie · 2 Bac Sciences Physiques</p><div className="years">{years.map(y=><a className="year" href={"/examens/"+y} key={y}><strong>{y}</strong><small>Session normale + rattrapage</small><b>→</b></a>)}</div></section></main></>
}