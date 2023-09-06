
import Nav from './Nav'
const headerImage = "https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&k=20&m=1146473249&s=612x612&w=0&h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c=";
export default function Header({}){
return (
    <header style={{ height: "360px", overflow: "hidden" }}>
        <Nav />
    <img style={{ width: "100%" }} src={headerImage} />
  </header>
)    
}