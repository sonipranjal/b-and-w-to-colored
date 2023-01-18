import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Popover from "./shared/popover";
import Tooltip from "./shared/tooltip";

export default function ComponentGrid() {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <div className="flex w-full justify-center">
      <div className="mx-4">
        <Popover
          content={
            <div className="w-full rounded-md bg-white p-2 sm:w-40">
              <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Item 1
              </button>
              <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Item 2
              </button>
              <button className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                Item 3
              </button>
            </div>
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => setOpenPopover(!openPopover)}
            className="flex w-40 items-center justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
          >
            <p className="text-gray-600">Popover</p>
            <FaChevronDown
              className={`h-4 w-4 text-gray-600 transition-all ${
                openPopover ? "rotate-180" : ""
              }`}
            />
          </button>
        </Popover>
      </div>
      <Tooltip content="Precedent is an opinionated collection of components, hooks, and utilities for your Next.js project.">
        <div className="flex w-40 cursor-default items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
          <p className="text-gray-600">Tooltip</p>
        </div>
      </Tooltip>
    </div>
  );
}
