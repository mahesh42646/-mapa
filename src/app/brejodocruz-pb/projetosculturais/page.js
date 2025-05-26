import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './page.css';

export default function BrejoDoCruzPB() {
    return (
        <div  style={{ background: "#fff", minHeight: "100vh", color: "#111" }}>
            {/* Header */}
            <header  style={{
                background: "#fff",
                borderBottom: "2px solid #eee",
                padding: "0",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 90
            }}>
                {/* Logo and slogan */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: 30 }}>
                    <img src="/images/logo.png" alt="Logo" style={{ height: 77, marginBottom: 2 }} />
        
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        flex: 1,
                        margin: '0 20%',
                        maxWidth: 1199,
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'auto',
                    }}
                >
                    <ul
                        style={{
                            display: 'flex',
                            gap: 20,
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <li style={{ textAlign: "center" }}>
                            <div style={{
                                background: "#137c0b",
                                borderRadius: "50%",
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}>
                                <span style={{ fontSize: 26, color: "#fff" }}><i class="bi bi-house-door-fill"></i></span>
                            </div>
                            <div style={{ color: "#137c0b", fontWeight: "bold", fontSize: 15, marginTop: 2 }}>Início</div>
                        </li>
                        <li style={{ textAlign: "center" }}>
                            <div style={{
                                background: "#137c0b",
                                borderRadius: "50%",
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}>
                                <span style={{ fontSize: 26, color: "#fff" }}><i class="bi bi-puzzle"></i></span>
                            </div>
                            <div style={{ color: "#137c0b", fontWeight: "bold", fontSize: 15, marginTop: 2 }}>Projetos</div>
                        </li>
                        <li style={{ textAlign: "center" }}>
                            <div style={{
                                background: "#137c0b",
                                borderRadius: "50%",
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}>
                                <span style={{ fontSize: 26, color: "#fff" }}><i class="bi bi-bank"></i></span>
                            </div>
                            <div style={{ color: "#137c0b", fontWeight: "bold", fontSize: 15, marginTop: 2 }}>Espaços</div>
                        </li>
                        <li style={{ textAlign: "center" }}>
                            <div style={{
                                background: "#137c0b",
                                borderRadius: "50%",
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}>
                                <span style={{ fontSize: 26, color: "#fff" }}><i class="bi bi-people-fill"></i></span>
                            </div>
                            <div style={{ color: "#137c0b", fontWeight: "bold", fontSize: 15, marginTop: 2 }}>Agentes</div>
                        </li>
                    </ul>
                </nav>
                {/* Responsive styles for nav */}
                <style>{`
                    @media (max-width: 900px) {
                        nav[style] {
                            margin: 0 2% !important;
                        }
                    }
                    @media (max-width: 768px) {
                        nav[style] ul {
                            flex-direction: column !important;
                            gap: 10px !important;
                        }
                        nav[style] {
                            margin: 0 2% !important;
                        }
                    }
                `}</style>

                {/* Entrar button */}
                <div style={{ marginRight: 40 }}>
                    <a href="#" style={{
                        color: "#fff",
                        background: "#137c0b",
                        borderRadius: 22,
                        padding: "10px 32px",
                        fontWeight: "bold",
                        fontSize: 16,
                        textDecoration: "none"
                    }}>Entrar</a>
                </div>
            </header>

            {/* Hero Image */}
            <div
                style={{
                    width: "100%",
                    height: 220,
                    background: "#000",
                    position: "relative"

                }}
            >
                <div>
                    <img
                        src="/images/image2.png"
                        alt="Banner"
                        style={{
                            width: "100%",
                            height: 300,
                            background: "#000",
                            position: "relative"
                        }}
                    />
                </div>
                {/* Profile Card */}
                <div style={{
                    position: "absolute",
                    left: "27%",
                    transform: "translateX(-50%)",
                    bottom: -200,
                    bottom: -190,
                    // background: "#fff",
                    color: "#000",
                    borderRadius: 15,
                    // boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    padding: "18px 30px 18px 18px",
                    display: "flex",
                    alignItems: "center",
                    minWidth: 500,
                    maxWidth: "90vw"
                }}>
                    <img
                        src="/images/card03.png"
                        alt="Profile"
                        style={{
                            width: 140,
                            height: 140,
                            
                            borderRadius: "50%",
                            border: "1px solid #000",
                            marginRight: 20,
                            objectFit: "cover"
                        }}
                    />
                    <div style={{ width: "100%", marginBottom: "-14% "}}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <h2 style={{ margin: 0, fontWeight: 600, fontSize: 22 }}>Cinema na Comunidade<span style={{ fontSize: 18 }}>
                                <span style={{ gap: 10 }}>            <i className="bi bi-patch-check-fill" style={{ fontSize: 16, color: 'blue' }}></i>
                                    <i className="bi bi-patch-check-fill" style={{ fontSize: 16, color: '#FFB020' }}></i>
                                </span>   </span></h2>
                        </div>
                        <div style={{ fontSize: 15, color: "#555", marginBottom: 6 }}>TIPO: MOSTRA</div>
                        <div style={{ marginTop: 8 }}>
                            <span style={{ marginRight: 12, fontSize: 20, color: "#22" }}><i class="bi bi-facebook"></i></span>
                            <span style={{ marginRight: 12, fontSize: 20, color: "#222" }}><i class="bi bi-instagram"></i></span>
                            <span style={{ marginRight: 12, fontSize: 20, color: "#222" }}><i class="bi bi-youtube"></i></span>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for profile card */}
            <div style={{ height: '180px' }} />

            {/* About Section */}
            <section style={{
                background: "#fff",
                color: "#111",
                borderRadius: 10,
                margin: "0 auto",
                maxWidth: 1199,
                padding: 0,
                marginBottom: 0
            }}>
                <div style={{ padding: "0 30px" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 0 8px 0" }}>
                        <h4 style={{ fontWeight: "bold", fontSize: 16, margin: 0 }}>About</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#111', marginRight: 4 }}>
                            <img src="/images/Followus1.png" alt="Crest" style={{ height: 38 }} /></span>
                        </div>
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 10 }}>
                    O Cine Derréis é um resgate cultural, da versão Cinema na Comunidade, projeto criado e executado por Marcelo Lima, quando então Secretário de Cultura. Atualmente como Secretário Executivo do Coletivo Derréis e um dos representantes do nosso audiovisual, revitalizamos o projeto na versão Cine Derréis que visa promover a produção e a exibição de obras audiovisuais de produção nordestina brasileira.                    </div>
                    
                </div>
            </section>

            {/* Contact Section */}
            <section style={{
                background: "#fff",
                color: "#111",
                borderRadius: 10,
                margin: "0 auto",
                maxWidth: 1199,
                padding: 0,
                marginBottom: 0
            }}>
                <div style={{ padding: "0 30px" }}>
                    <h4 style={{ margin: "20px 0 8px 0", fontWeight: "bold", fontSize: 16 }}>CONTACT</h4>
                    <div style={{ marginTop: 0, fontSize: 15 }}>
                        <div>cinemacomunidade@gmail.com</div>
                        <div>(83) 9 9999-9999</div>
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section style={{
                background: "#fff",
                color: "#111",
                borderRadius: 10,
                margin: "0 auto",
                maxWidth: 1199,
                padding: 0,
                marginBottom: 0
            }}>
                <div style={{ padding: "0 30px" }}>
                    <h4 style={{ margin: "20px 0 8px 0", fontWeight: "bold", fontSize: 16 }}>Photo gallery</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 10 }}>
                        <img src="/images/photo01.png" alt="Gallery 1" style={{ width: 120, height: 120, borderRadius: 10, objectFit: "cover" }} />
                        <img src="/images/photo02.png"alt="Gallery 2" style={{ width: 120, height: 120, borderRadius: 10, objectFit: "cover" }} />
                        <img src="/images/photo03.png" alt="Gallery 3" style={{ width: 120, height: 120, borderRadius: 10, objectFit: "cover" }} />
                        
                    </div>
                </div>
            </section>

            {/* Videos */}
            <section style={{
                background: "#fff",
                color: "#111",
                borderRadius: 10,
                margin: "0 auto",
                maxWidth: 1199,
                padding: 0,
                marginBottom: 0
            }}>
                <div style={{ padding: "0 30px" }}>
                    <h4 style={{ margin: "20px 0 8px 0", fontWeight: "bold", fontSize: 16 }}>Videos</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 10 }}>
                        <div style={{ position: "relative" }}>
                            <iframe width="120" height="120" src="https://www.youtube.com/embed/your-video-id1" title="YouTube video" frameBorder="0" allowFullScreen style={{ borderRadius: 10 }}></iframe>
                            <img src="https://i.imgur.com/7yQ4Q4Q.png" alt="Play" style={{
                                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, opacity: 0.8
                            }} />
                        </div>
                       
                       
                    </div>
                </div>
                
                

            </section>

            {/* Public Link */}

            {/* Downloadable Files and Map Section */}
            <section style={{
                background: "#fff",
                color: "#111",
                borderRadius: 10,
                margin: "30px auto 0 auto",
                maxWidth: 1199,
                padding: 0,
                marginBottom: 0
            }}>
                
                <div style={{ textAlign: "left", margin: "20px 0 30px 30px", fontSize: 14 }}>
                This is the public page of the Cultural Project, which can be accessed by anyone. Example of a link in the system <br />
                    <a href="(https://mapadacultura.com/brejodocruz-pb/projetosculturais/102030)" style={{ color: "#4af", textDecoration: "underline" }}>
                    (https://mapadacultura.com/brejodocruz-pb/projetosculturais/102030)                     </a>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: "#222",
                color: "#fff",
                padding: "15px 0",
                fontSize: 14,
                borderTop: "4px solid #444",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative"
            }}>
                <span style={{ marginLeft: 30 }}>
                    MAPA CULTURA - © 2025 Todos os direitos reservados
                </span>
                <span style={{ color: "#4af", marginRight: 30 }}>
                    Desenvolvido por Devactiva Tecnologia
                </span>
            </footer>
        </div>
    );
}