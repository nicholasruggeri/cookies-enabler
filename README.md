# cookies-enabler

#### Options

```
COOKIES_ENABLER.init({
    element: 'ce-elm', // Default ce-elm
    trigger: 'ce-trigger', // Default class trigger .ce-trigger
    banner: 'ce-banner', // Default class banner .ce-banner
    textTrigger: 'Enable Cookies', // Enable text trigger 'Enable Cookis'
    duration: '365', // Default duration cookis 365 days
    eventScroll: false // Default false
});
```

E’ successo tutto così velocemente.

L’internet si è quasi rotto.

Le community stanno impazzendo per colpa/merito di questa nuova direttiva europea che obbliga il blocco preventivo dei cookie di profilazione di terze parti.

Nel mentre stanno nascendo plugin e servizi (anche a pagamento) per aiutare gli sviluppatori ad essere in regola.

Non servono.


Bastano poche righe javascript.


Step 1: capire quali script js installano cookie al caricamento della pagina (Google Analytics, Facebook Share, LinkedIn, Twitter ecc ecc ecc) ed aggiungere la classe “ce-elm” (di default) ai vari tag script;

Step 2: sostituire/aggiungere type: “text/plain” al posto di “text/javascript”;

Step 3: inserite COOKIES_ENABLER.init(); prima della chiusura del body.


Cookies-enabler previene l’installazione dei cookie che vengono caricati via javascript dai vari scripts che si inseriscono per tracciare l’utente o per inserire elementi social (likebox facebook, twitter ecc).


Nessuna dipendenza, facile da installare. Per supportare IE8 è necessario un polyfill per getElementsByClassName.


Tanti saluti.


N.
