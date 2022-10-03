import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../config";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { toast, Toaster } from "react-hot-toast";
import { WebCam2 } from "../../components/WebCam2";
const Index = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(router.query?.id);
  useEffect(() => {
    const GetData = async () => {
      if (router.query.id) {
        await supabase
          .from("users")
          .select("*")
          .eq("uuid", router.query?.id)
          .then(async (r) => {
            console.log(r);
            setData(r.data[0]);
            let bal =
              (await getAccountBalance(r.data[0].wallet.pubkey)) /
              LAMPORTS_PER_SOL;
            setBalance(bal);
          });
      }
    };
    GetData();
  }, [router]);
  const getAccountBalance = async (address) => {
    const publicKey = new PublicKey(address);
    const connection = new Connection(clusterApiUrl("devnet"));
    console.log(connection.getBalance(publicKey));
    return connection.getBalance(publicKey);
  };
  const sendMoney = () => {
    setOpen(true);
  };

  return (
    <>
      <WebCam2 open={open} setOpen={setOpen} />
      <div className="flex mt-24 items-center flex-col min-h-screen">
        <h1 className="text-7xl my-3 text-stone-400 font-extrabold">
          {balance} Sol
        </h1>
        <h1
          onClick={() => {
            window?.navigator.clipboard.writeText(data?.wallet.pubkey);
            toast.success("Wallet Address Copied");
          }}
          className="text-base mb-4 cursor-pointer"
        >
          ({data?.wallet.pubkey.slice(0, 4)}...
          {data?.wallet.pubkey.slice(
            data?.wallet.pubkey.length - 4,
            data?.wallet.pubkey.length
          )}
          )
        </h1>
        <div className="flex justify-between space-x-10">
          <button
            onClick={sendMoney}
            className="w-20 h-12 rounded-lg bg-red-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button className="w-20 h-12 rounded-lg bg-green-400">Receive</button>
        </div>
        <div className="mt-4">
          <h1 className="font-bold text-lg">Transaction</h1>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Index;
