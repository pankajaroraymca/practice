// ----------------------------------------- What are rendering techniques ------------------------------------

// 1) Server Side rendering:
    // It means content or HTML is generated on the server side for each request and sent back to the client for rednering. Then React or other framework just hydrates it.
    // The rendered HTML on server is static, hydration is the process to make page interative, so event listeners are attached at the client side.

    // Benefits :
    // SEO Friendly - As HTML is fetched instantly from server, google crwalers can easily index pages. Unlike react where component HTML is rendered through JS, at first there is only <div id= 'root'></div>
    // google crawler sees no html first , so page is not index. That's why react is not seo friendly.

    // Dynamic content: At each request, content is fetched. so the content is always latest.

    // Cons : 
    // Slower Performance: Because at req, content is fetched. extra overhead.
    // Caching needed for perfromance at scale.

    // getServerSideProps: This method is used to pass data to the server.

// 2) Static Site generation (SSG) : It is a pre rendering method, where HTML pages are generated at the build time rather than on each request (SSR)
    // During build time, these pages html are generated and served as static files on server.
    // when req comes, these files are sent directly to the client without node compution.

    // Benefits: SEO friendly as content is rendered through server.
    // Better performance as no node compution.

    // Cons: Not suitable for pages where data is changed frequently.

    // we can implement ISR also, incremental static regeneration. In this static pages are automatically regenerated in the background.

    export async function getStaticProps() {
    const res = await fetch('https://api.example.com/posts');
    const posts = await res.json();

    return {
        props: { posts },
        revalidate: 60, // regenerate page at most every 60 seconds
    };
    }

// 3) Client Side Rendering (CSR): It is a rendering technique where html is generated and rendered on the client side then reac or other frameworks hydrates it.
    // Not SEO friendly
    // High bundle size leads to performance issue.
    // Until the page is loaded, user may see a blank screen or a loader.

// ---------------------------------------- Benefits of using Next.js -------------------------------------------

// 1) Next js can implement SSR, SSG, CSR and ISR. So we can choose between them according to the need.
// 2) As Next.js can implement SSR, SEO friendly,
// 3) Automatic Code splitting: Instead of sending the whole app to the JS bundle, nextjs splits into chunk bundles. when route is visited only then chunk bundle is fetched.
    // We know in react js, whole app is included in the bundle size. to reduce the bundle size we have to implement Lazy loading techniques on each component
    // But in next.js each route is bundled separately. so when we visit that particular route only then its chunk bundle is fetched. 
    // Less bundle size improve inital load performance. So it matters. Nextjs automatically does it.
// 4) File based routing: pages/about.js → /about.
    // Dynamic routes: [id].js → /posts/1
// 5) API routes: You can directly implement backend endpoints ( no separate node server ).
// it means your small next js application can be deployed serverless.
// Api endpoints must be written inside pages/api/
// each file will server as the endpoint. These files are only server side, it is never included in the JS bundle.

// Example

// File: pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API Route!' });
}
// Now you can call it at:
// http://localhost:3000/api/hello

