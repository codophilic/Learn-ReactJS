const styleForErrorPage = {
    textAlign: 'center',
    padding: '48px',
    background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '22px',
    margin: '48px auto',
    maxWidth: '600px',
    fontFamily: 'Poppins, Arial, sans-serif',
    fontSize: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 60px 10px #0ff, 0 0 80px 20px #ff6a88',
    lineHeight: '1.7',
    position: 'relative',
    overflow: 'hidden',
};

const glowText = {
    fontSize: '3.2rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #ff6a88, 0 0 120px #0ff',
    marginBottom: '18px',
    letterSpacing: '2.5px',
    animation: 'glowPulse 2s infinite alternate',
};

const glowSubText = {
    textShadow: '0 0 12px #0ff, 0 0 24px #ffdde1',
    marginBottom: '14px',
    color: '#e0e0e0',
};

const neonBar = {
    width: '80%',
    height: '6px',
    margin: '32px auto 24px auto',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #0ff 0%, #ff6a88 100%)',
    boxShadow: '0 0 24px #0ff, 0 0 48px #ff6a88',
    animation: 'barGlow 2s infinite alternate',
};

const keyframes = `
@keyframes glowPulse {
    from { text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #ff6a88, 0 0 120px #0ff; }
    to { text-shadow: 0 0 40px #0ff, 0 0 80px #0ff, 0 0 160px #ff6a88, 0 0 240px #0ff; }
}
@keyframes barGlow {
    from { box-shadow: 0 0 24px #0ff, 0 0 48px #ff6a88; }
    to { box-shadow: 0 0 48px #0ff, 0 0 96px #ff6a88; }
}
`;

export default function ErrorPage() {
    return (
        <div style={styleForErrorPage}>
            <style>{keyframes}</style>
            <h1 style={glowText}>Oops!</h1>
            <div style={neonBar}></div>
            <p style={glowSubText}>Sorry, an unexpected error has occurred.</p>
            <p style={glowSubText}>We are working to fix this issue. Please try again later.</p>
        </div>
    );
}