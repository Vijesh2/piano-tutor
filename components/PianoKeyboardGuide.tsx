import { StyleSheet, Text, View } from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

import { KeyboardGuide } from "@/types/lesson";

type PianoKeyboardGuideProps = {
  guide: KeyboardGuide;
};

type PianoNote = {
  id: string;
  name: string;
  octave: number;
  isBlack: boolean;
  label: string;
};

const whiteNames = ["C", "D", "E", "F", "G", "A", "B"];
const blackKeyOffsets: Record<string, number> = {
  "C#": 0.68,
  "D#": 1.68,
  "F#": 3.68,
  "G#": 4.68,
  "A#": 5.68,
};
const noteOrder = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function parseNote(note: string) {
  const match = /^([A-G]#?)(\d)$/.exec(note);
  if (!match) {
    throw new Error(`Invalid note: ${note}`);
  }

  return {
    name: match[1],
    octave: Number(match[2]),
    midi: Number(match[2]) * 12 + noteOrder.indexOf(match[1]),
  };
}

function formatNote(name: string, octave: number) {
  return `${name}${octave}`;
}

function buildNotes(firstNote: string, lastNote: string): PianoNote[] {
  const first = parseNote(firstNote);
  const last = parseNote(lastNote);
  const notes: PianoNote[] = [];

  for (let midi = first.midi; midi <= last.midi; midi += 1) {
    const octave = Math.floor(midi / 12);
    const name = noteOrder[midi % 12];
    notes.push({
      id: formatNote(name, octave),
      name,
      octave,
      isBlack: name.includes("#"),
      label: formatNote(name, octave),
    });
  }

  return notes;
}

export function PianoKeyboardGuide({ guide }: PianoKeyboardGuideProps) {
  const notes = buildNotes(guide.firstNote, guide.lastNote);
  const whiteNotes = notes.filter((note) => !note.isBlack);
  const blackNotes = notes.filter((note) => note.isBlack);
  const highlighted = new Set(guide.highlightedNotes);
  const labeled = new Set(guide.labeledNotes ?? guide.highlightedNotes);
  const whiteWidth = 64;
  const keyboardHeight = 184;
  const width = whiteNotes.length * whiteWidth;

  function whiteIndexFor(note: PianoNote) {
    let index = 0;

    for (const current of whiteNotes) {
      if (current.id === note.id) {
        return index;
      }

      index += 1;
    }

    return index;
  }

  function blackX(note: PianoNote) {
    const octaveStart = whiteNotes.findIndex((white) => white.id === formatNote("C", note.octave));
    const offset = blackKeyOffsets[note.name] ?? 0;
    return (octaveStart + offset) * whiteWidth - 18;
  }

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>Keyboard guide</Text>
        <Text style={styles.caption}>{guide.caption}</Text>
      </View>
      <View style={styles.keyboardFrame}>
        <Svg width="100%" height={keyboardHeight} viewBox={`0 0 ${width} ${keyboardHeight}`}>
          {whiteNotes.map((note) => {
            const x = whiteIndexFor(note) * whiteWidth;
            const isHighlighted = highlighted.has(note.id);

            return (
              <Rect
                key={note.id}
                x={x + 1}
                y={1}
                width={whiteWidth - 2}
                height={keyboardHeight - 2}
                rx={6}
                fill={isHighlighted ? "#f1d37a" : "#fffdf6"}
                stroke={isHighlighted ? "#8a6722" : "#cdbf9f"}
                strokeWidth={isHighlighted ? 3 : 1}
              />
            );
          })}
          {whiteNotes.map((note) => {
            const x = whiteIndexFor(note) * whiteWidth;
            const isHighlighted = highlighted.has(note.id);

            return (
              <Line
                key={`${note.id}-split`}
                x1={x}
                y1={0}
                x2={x}
                y2={keyboardHeight}
                stroke={isHighlighted ? "#8a6722" : "#dfd1b6"}
                strokeWidth={1}
              />
            );
          })}
          {blackNotes.map((note) => {
            const isHighlighted = highlighted.has(note.id);

            return (
              <Rect
                key={note.id}
                x={blackX(note)}
                y={0}
                width={36}
                height={108}
                rx={5}
                fill={isHighlighted ? "#8a6722" : "#1f2a22"}
                stroke={isHighlighted ? "#f1d37a" : "#1f2a22"}
                strokeWidth={2}
              />
            );
          })}
          {whiteNotes.map((note) => {
            if (!labeled.has(note.id)) {
              return null;
            }

            const x = whiteIndexFor(note) * whiteWidth + whiteWidth / 2;
            const isHighlighted = highlighted.has(note.id);

            return (
              <SvgText
                key={`${note.id}-label`}
                x={x}
                y={keyboardHeight - 24}
                fill={isHighlighted ? "#1f2a22" : "#665d4d"}
                fontSize={18}
                fontWeight="800"
                textAnchor="middle"
              >
                {note.label}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#fffaf0",
    borderColor: "#dfd1b6",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 28,
  },
  header: {
    marginBottom: 14,
  },
  title: {
    color: "#1f2a22",
    fontSize: 24,
    fontWeight: "900",
  },
  caption: {
    color: "#4f4639",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 6,
  },
  keyboardFrame: {
    backgroundColor: "#2f4636",
    borderRadius: 8,
    padding: 10,
  },
});
