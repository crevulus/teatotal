import axios from "axios";

const makeAxiosCall = (url: string) => {
  return axios.get(url).then((response) => response.data);
};

export const getBitcoinPrice = async () => {
  try {
    const data: any = await makeAxiosCall(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    console.log(await data.bpi.USD.rate);
    return await data.bpi.USD.rate;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getAdviceSlip = async () => {
  try {
    const data: any = await makeAxiosCall("https://api.adviceslip.com/advice");
    console.log(await data.slip.advice);
    return await data.slip.advice;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const animals = [
  { name: "cat", endpoint: "https://aws.random.cat/meow", returns: "file" },
  { name: "dog", endpoint: "https://random.dog/woof.json", returns: "url" },
  {
    name: "duck",
    endpoint: "https://random-d.uk/api/v2/random",
    returns: "url",
  },
  { name: "fox", endpoint: "https://randomfox.ca/floof", returns: "image" },
];

const selectRandomAnimal = () => {
  const random = Math.floor(Math.random() * animals.length);
  return animals[random];
};

export const getRandomAnimal = async () => {
  const animal = selectRandomAnimal();
  try {
    const data: any = await makeAxiosCall(animal.endpoint);
    console.log(await data[`${animal.returns}`]);
    return await data[`${animal.returns}`];
  } catch (error) {
    console.log(error);
  }
  return null;
};
