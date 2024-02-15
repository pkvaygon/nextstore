"use client";
import React from "react";
import { Card, Image, CardBody, CardFooter, Button, Spacer,Link } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { bannerCatalog } from "@/localdata";
import { cardVariants } from "@/framermotion";
import { useRouter } from "next/navigation";

export default function CardBanner(props) {
  const router = useRouter()
  return (
    <article className="w-full h-full pt-8 grid  grid-cols-2 grid-flow-row gap-4">
      {bannerCatalog.map((el) => (
        <motion.div
          key={el.id}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.8 }}
          className="w-auto"
        >
          <Card className="w-full col-span-full" {...props}>
            <CardBody className="px-3 pb-1">
              <Image
                alt="Card image"
                className="aspect-video w-full object-cover object-top"
                src={el.image}
              />
              <Spacer y={2} />
              <div className="flex flex-col max-sm:gap-1 gap-2 px-2">
                <p className="max-sm:text-xs text-large font-medium">{el.label}</p>
                <p className="max-sm:leading-none max-sm:text-[8px] text-small text-default-400">{el.description}</p>
              </div>
            </CardBody>
            <CardFooter className="justify-end">
              <Button as={Link} href="/shop" fullWidth>See catalog</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </article>
  );
}
