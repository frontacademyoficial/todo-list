import Wrapper from "./Wrapper";

const Page = ({ children }) => (
  <main style={{ minHeight: "80vh" }}>
    <Wrapper>{children}</Wrapper>
  </main>
);

export default Page;
