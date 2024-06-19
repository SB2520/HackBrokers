"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import Account from "../../artifacts/contracts/account.sol/Account.json";

export default function ETHCARD() {
  const [days, setDays] = useState(7);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      console.log("Change occurred");
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/upload?days=${days}&type=eth`,
        );
        console.log(res);
        setImageUrl(res.data.secure_url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [days]);

  useEffect(() => {
    const fetchImage = async () => {
      console.log("Change occured");
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/upload?days=7&type=eth`,
        );
        console.log(res);
        setImageUrl(res.data.secure_url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  async function buy() {
    try {
      const sepoliaUrl = String(process.env.SEPOLIA_RPC_URL);
      const address = String(process.env.CONTRACT_ADDRESS);
      const provider = new ethers.JsonRpcProvider(sepoliaUrl);
      const privateKey = String(process.env.PRIVATE_KEY);
      const wallet = new ethers.Wallet(privateKey);
      const walletConnected = wallet.connect(provider);

      const contract = new ethers.Contract(
        address,
        Account.abi,
        walletConnected,
      );
      const createUser = await contract.buy(
        "swagatswaroop@gmail.com",
        0,
        "ETH",
        0,
      );
      await createUser.wait();
    } catch (error) {
      console.log("Error");
    }
  }

  async function sell() {
    try {
      const sepoliaUrl = String(process.env.SEPOLIA_RPC_URL);
      const address = String(process.env.CONTRACT_ADDRESS);
      const provider = new ethers.JsonRpcProvider(sepoliaUrl);
      const privateKey = String(process.env.PRIVATE_KEY);
      const wallet = new ethers.Wallet(privateKey);
      const walletConnected = wallet.connect(provider);

      const contract = new ethers.Contract(
        address,
        Account.abi,
        walletConnected,
      );

      const createUser = await contract.sell(
        "swagatswaroop@gmail.com",
        "ETH",
        0,
        0,
      );
      await createUser.wait();
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-700 from-30% via-purple-900 to-indigo-900">
        <div className="w-full bg-gradient-to-r from-pink-700 via-purple-900 to-indigo-900 py-4 text-center font-serif text-3xl font-bold text-white">
          Crypto Analyzer
        </div>
        <div className="m-4 overflow-hidden rounded bg-gray-300 p-8 shadow-lg">
          <div className="flex flex-col items-center p-6 md:flex-row">
            <select
              className="mb-4 rounded border p-2 md:mb-0"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={365}>365 Days</option>
            </select>
            <div className="flex w-full justify-center p-3 md:w-2/3 lg:w-1/2">
              <img
                src={imageUrl}
                alt="Ethereum Image"
                className="h-auto w-full rounded"
              />
            </div>
            <div className="w-full px-6 py-4 md:w-1/3 lg:w-1/2">
              <div className="mb-2 text-center text-xl font-bold">
                Ethereum (ETH):
              </div>
              <p className="text-center text-base text-gray-700">
                Ethereum is a decentralized blockchain with smart contract
                functionality. Ether is the native cryptocurrency of the
                platform. Among cryptocurrencies, ether is second only to
                bitcoin in market capitalization. It is open-source software.
                Ethereum was conceived in 2013 by programmer Vitalik Buterin.
              </p>
              <div className="m-4 flex flex-col items-center">
                <input
                  placeholder="Enter the number of crypto"
                  className="w-80 rounded-lg p-5"
                  type="number"
                />
                <div className="mt-4 flex space-x-4">
                  <button
                    className="flex items-center self-start rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500 md:text-base"
                    onClick={buy}
                  >
                    Buy
                  </button>
                  <button
                    className="flex items-center self-start rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 md:text-base"
                    onClick={sell}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-12 mr-12 mt-4 flex flex-row justify-between">
            <div className="flex w-1/2 flex-row justify-around">
              <div className="flex items-center self-start rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500 md:text-base">
                <FontAwesomeIcon icon={faArrowUp} size="2x" color="white" />
                <h1 className="pl-4 text-white">
                  <strong>0.4576%</strong>
                </h1>
              </div>
              <div className="flex items-center self-start rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 md:text-base">
                <FontAwesomeIcon icon={faArrowDown} size="2x" color="white" />
                <h1 className="pl-4 text-white">
                  <strong>0.5424%</strong>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
