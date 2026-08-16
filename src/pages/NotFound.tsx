import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background"
    >
      <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Compass className="size-8" />
        </motion.div>
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl font-bold tracking-tight"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-3 max-w-md text-muted-foreground"
        >
          This page wandered off the route map. Let&apos;s get you back to the
          website.
        </motion.p>
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-8"
        >
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
