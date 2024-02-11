"use client";
import React from "react";
import { Card, Image, CardBody, CardFooter, Button, Spacer } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { bannerCatalog } from "@/localdata";

export default function CardBanner(props) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <article className="w-full h-full pt-8 grid max-sm:grid-cols-1 grid-cols-2 grid-flow-row gap-4">
      {bannerCatalog.map((el) => (
        <motion.div
          key={el.id}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.8 }}
          className="max-w-xs"
        >
          <Card className="w-full max-sm:max-w-xs" {...props}>
            <CardBody className="px-3 pb-1">
              <Image
                alt="Card image"
                className="aspect-video w-full object-cover object-top"
                src={el.image}
              />
              <Spacer y={2} />
              <div className="flex flex-col gap-2 px-2">
                <p className="max-sm:text-base text-large font-medium">{el.label}</p>
                <p className=" max-sm:text-xs text-small text-default-400">{el.description}</p>
              </div>
            </CardBody>
            <CardFooter className="justify-end gap-2">
              <Button fullWidth>See catalog</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </article>
  );
}
