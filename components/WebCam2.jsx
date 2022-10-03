/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { Spinner } from "./spinner";
import { UserContext } from "../pages/_app";

export const WebCam2 = (props) => {
  const remCheck = useContext(UserContext);
  const [imgsrc, setImgSrc] = React.useState("");
  const [pageMessage, setPageMessage] = React.useState("Verifying...");
  const router = useRouter();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  useEffect(() => {
    console.log(remCheck, props.open);
    if (remCheck.rem !== false && props.open) {
      setTimeout(() => {
        props.setOpen(false);
        toast.success("Access Granted!!");
        remCheck.setRem(false);
      }, 10000);
    } else if (remCheck.rem !== true && props.open) {
      setTimeout(() => {
        setPageMessage("Not Found");
        toast.success("Face Not Match");

        setTimeout(() => {
          setPageMessage("Verifying...");
          remCheck.setRem(true);
        }, 5000);
      }, 10000);
    }
  }, [props, remCheck]);
  return (
    <>
      <Transition.Root show={props.open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[30rem] sm:p-6">
                  <Webcam
                    audio={false}
                    height={320}
                    screenshotFormat="image/jpeg"
                    width={500}
                    videoConstraints={videoConstraints}
                  >
                    {({ getScreenshot }) => (
                      <button className="flex w-full mt-5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        {pageMessage === "Verifying..." ? <Spinner /> : ""}
                        {pageMessage}
                      </button>
                    )}
                  </Webcam>

                  {/* {imgsrc !== "" && (
                    <>
                      <img className="w-[28rem]" src={imgsrc} alt="img" />
                      <button
                        onClick={() => {
                          props.setOpen(false);
                          toast.success("Great!!, Sign you In");
                          router.push(`/info/${props.uuid}`);
                        }}
                        className="flex w-full mt-5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Accept
                      </button>
                    </>
                  )} */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Toaster />
    </>
  );
};
