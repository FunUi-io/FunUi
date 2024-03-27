const DarkMode = ( state ) => {
        if (state) {
            const root = document.querySelector(':root') as HTMLElement; // Narrowing the type
            if (root) {
                root.style.setProperty('--bd-theme', '#141414'); // Dark background theme color
                root.style.setProperty('--bd-color', '#FFFFFFD9'); // Background color
                root.style.setProperty('--borderColor', '#444654'); // Border color
                root.style.setProperty('--raiseThemes', '#1e1e1e'); // Raised element color
                root.style.setProperty('--lighter', '#33333349'); // Lighter shade
                root.style.setProperty('--inputOutline', '#1e1e1e'); // Input outline color
                root.style.setProperty('--lightThemeDark', '#FFFFFFD9'); // Dark theme for light elements

                root.style.setProperty('--muted', '#78716c'); // Base muted color
                root.style.setProperty('--muted50', '#171717'); // Muted 50 (darkest)
                root.style.setProperty('--muted100', '#262626'); // Muted 100
                root.style.setProperty('--muted200', '#404040'); // Muted 200
                root.style.setProperty('--muted300', '#525252'); // Muted 300
                root.style.setProperty('--muted400', '#737373'); // Muted 400
                root.style.setProperty('--muted500', '#a3a3a3'); // Muted 500
                root.style.setProperty('--muted600', '#d4d4d4'); // Muted 600
                root.style.setProperty('--muted700', '#e5e5e5'); // Muted 700
                root.style.setProperty('--muted800', '#f5f5f5'); // Muted 800
                root.style.setProperty('--muted900', '#fafafa'); 
                
                // Dark theme for success colors
                root.style.setProperty('--success', '#1d6640'); 
                root.style.setProperty('--successLight', '#c7e6c8');

                // Dark theme for info colors
                root.style.setProperty('--info', '#2471a3'); 
                root.style.setProperty('--infoLight', '#b3d9ed'); 

                // Dark theme for warning colors
                root.style.setProperty('--warning', '#8c3d00'); 
                root.style.setProperty('--warningLight', '#d8b69c'); 

                // Dark theme for danger colors
                root.style.setProperty('--danger', '#6b0600'); 
                root.style.setProperty('--dangerLight', '#bfbfbf'); 

                root.style.setProperty('--light', '#c5d8e0'); // Light color
                root.style.setProperty('--deepLight', '#154556'); // Deep light color
            }
        }

};

export default DarkMode;
