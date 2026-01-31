import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Sparkles, Brain } from "lucide-react";

export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const summarize = () => {
    const sentences = text.split(".").slice(0, 5).join(".") + ".";
    setSummary(sentences);
  };

  const generateFlashcards = () => {
    const points = text
      .split(".")
      .filter((s) => s.trim().length > 20)
      .slice(0, 6);
    setFlashcards(points.map((p, i) => ({ q: `Key Point ${i + 1}`, a: p })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Open Study Assistant</h1>
        <p className="text-center text-muted-foreground">
          Upload or paste your own notes. Generate summaries and flashcards — 100%
          legal.
        </p>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 space-y-4">
            <Textarea
              rows={8}
              placeholder="Paste your study notes here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex gap-3">
              <Button onClick={summarize} className="flex gap-2">
                <Sparkles className="w-4 h-4" /> Summarize
              </Button>

              <Button
                onClick={generateFlashcards}
                variant="secondary"
                className="flex gap-2"
              >
                <Brain className="w-4 h-4" /> Flashcards
              </Button>
            </div>
          </CardContent>
        </Card>

        {summary && (
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p>{summary}</p>
            </CardContent>
          </Card>
        )}

        {flashcards.length > 0 && (
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Flashcards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {flashcards.map((f, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl shadow">
                    <p className="font-medium">{f.q}</p>
                    <p className="text-sm text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

