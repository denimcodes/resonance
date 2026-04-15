"use client";

import { TextInputPanel } from "@/app/features/text-to-speech/components/text-input-panel";
import { VoicePreviewPlaceholder } from "@/app/features/text-to-speech/components/voice-preview-placeholder";
import { SettingsPanel } from "@/app/features/text-to-speech/components/settings-panel";
import {
  defaultTTSValues,
  TextToSpeechForm,
} from "../components/text-to-speech-form";

export function TextToSpeechView() {
  return (
    <TextToSpeechForm defaultValues={defaultTTSValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Text input area */}
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
}
