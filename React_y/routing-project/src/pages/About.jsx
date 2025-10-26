const About = () => (
  <>
    <h2>About</h2>
    <ul>
      {["HTML", "CSS", "JavaScript"].map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </>
);

export default About;
