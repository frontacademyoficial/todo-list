import Wrapper from "./Wrapper";

const Page = ({ children }) => (
  <main style={{ minHeight: "calc(100vh - 164px)" }}>
    <Wrapper>{children}</Wrapper>
  </main>
);

export default Page;
