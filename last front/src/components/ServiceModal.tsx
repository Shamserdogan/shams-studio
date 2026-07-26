
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: any;
}

export default function ServiceModal({
    isOpen,
    onClose,
    service,
}: ServiceModalProps) {
    console.log(service?.id);
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                   className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1120] border border-white/10 p-8"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-white"
                    >
                        <X size={28} />
                    </button>
                    <div className="grid md:grid-cols-2 gap-8 items-start">

                    <div className="rounded-2xl overflow-hidden border border-white/10 h-[450px] relative">
                      {(service?.mainVideo || service?.previewVideo) ? (
                        <video
                          src={service?.mainVideo || service?.previewVideo}
                          controls
                          autoPlay
                          muted
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={service?.mainImage || service?.previewImage || service?.image}
                          alt={service?.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {service?.title}
                    </h2>

                    <p className="text-gray-400">
                        {service?.description}
                    </p>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Key Highlights
                        </h3>

                        <ul className="space-y-2">
                            {service?.highlights?.map((item: string, index: number) => (
                                <li
                                    key={index}
                                    className="text-gray-300 flex items-center gap-2"
                                >
                                    ✅ {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Technologies
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {service?.tech?.map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
    <a
        href="https://wa.me/923429225675"
        target="_blank"
        rel="noreferrer"
        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition"
    >
        Start Your Project
    </a>

    <button
        onClick={onClose}
        className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
    >
        Close
    </button>
</div>
</div>
</div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}