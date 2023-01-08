export function SVG({name}: {name: string}) {
  switch (name) {
    case 'logo': return (
      <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title/><g id="clapperboard"><polygon points="12.45 9.93 9.03 6.49 6.36 7.16 6.36 10.64 9.58 10.64 12.45 9.93"/><polygon points="19.74 8.1 16.31 4.67 10.24 6.19 13.66 9.63 19.74 8.1"/><polygon points="24.58 6.88 21.15 3.45 17.53 4.38 20.96 7.8 24.58 6.88"/><polygon points="22.38 3.15 25.8 6.58 31 5.29 31 1 22.38 3.15"/><path d="M1,31H31V17.07H1ZM8.5,20.29h15v6.42H8.5Z"/><polygon points="23.6 16 31 16 31 11.71 27.87 11.71 23.6 16"/><polygon points="26.36 11.71 21.8 11.71 17.51 16 22.09 16 26.36 11.71"/><polygon points="8.41 16 16 16 20.29 11.71 12.7 11.71 8.41 16"/><polygon points="11.19 11.71 6.36 11.71 6.36 16 6.9 16 11.19 11.71"/><rect height="3.21" width="4.29" x="1" y="7.43"/><rect height="4.29" width="4.29" x="1" y="11.71"/></g></svg>
    );
    default: return null;
  }
}
