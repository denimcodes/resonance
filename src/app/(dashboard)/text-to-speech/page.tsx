import { TextToSpeechView } from "@/app/features/text-to-speech/views/text-to-speech-view";
import { Metadata } from "next";

export const metadata: Metadata = { title: 'Text to Speech' };

export default function TextToSpeechPage() {
  return <TextToSpeechView />
}