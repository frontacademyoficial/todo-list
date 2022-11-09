import Wrapper from "./Wrapper";

const Page = ({ children }) => (
  <main style={{ minHeight: "100vh" }}>
    <Wrapper>{children}</Wrapper>
  </main>
);

export default Page;
