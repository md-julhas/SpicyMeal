import React from "react"
import { Tooltip } from "@mui/material"

import { socialLinks } from "../constants/data"

const SocialLinks = ({ bgColor }) => {
  return (
    <div className="flex gap-2">
      {socialLinks.map((item) => (
        <Tooltip key={item.id} title={item.name} arrow>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-themeColor rounded-full"
            style={{ backgroundColor: bgColor }}
          >
            {item.icon}
          </a>
        </Tooltip>
      ))}
    </div>
  )
}

export default SocialLinks
