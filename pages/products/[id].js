import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { query } = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (query.id) {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
          const user = await app.logIn(credentials);
          const oneProduct = await user.functions.getOneProduct(query.id);
          setProduct(() => oneProduct);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      {product && (
        <>
          <Head>
            <title>TechNook - {product.name}</title>
            <link rel="icon" type="image/png" href="favicon.png" />

            <meta property="og:title" content="TechNook" />
            <meta
              property="og:description"
              content="TechNook | Your Digital Haven For All Things TECH!"
            />
            <meta property="og:image" content="technook_preview.png" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <ProductDetail product={product} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
