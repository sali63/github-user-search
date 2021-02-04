import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();

  const languages = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    //could have thrown an if here to filter out language:null
    //didn't cuz watched the video after exhausting
    //my brains out— he he he

    /**********that if statement ****** */

    // if(!language) return total

    /**********that if statement ****** */

    // total[language] = total[language] + 1 || 1;
    return total;
  }, {});

  const mostUsedLanguages = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  //most stars per language
  const mostStarredLanguages = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars };
    });

  //stars , forks

  let { stars, forks } = repos.reduce(
    (total, repo) => {
      const { stargazers_count, name, forks } = repo;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars)
    .slice(-5)
    .filter((obj) => obj.value !== 0)
    .sort((a, b) => b.value - a.value);

  forks = Object.values(forks)
    .slice(-5)
    .filter((obj) => obj.value !== 0);

  //dummy chart Data
  const chartData = [
    { label: "JSS", value: 52 },
    { label: "html", value: 102 },
    { label: "css", value: 78 },
  ];
  // const dataLangArray = Object.entries(data).filter(
  //   (entry) => entry[0] !== "null"
  // );

  // const chartData = dataLangArray
  //   .reduce((acc, singleArr, index) => {
  //     //create new obj on each loop
  //     //{label: key, value}
  //     acc[index] = { label: singleArr[0], value: singleArr[1] };
  //     return acc;
  //   }, [])
  //   .sort((a, b) => b.value - a.value)
  //   .slice(0, 5);

  // console.log(Object.values(data).reduce((tot, value) => (tot += value)));

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguages} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStarredLanguages} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
