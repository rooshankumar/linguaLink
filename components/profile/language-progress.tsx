"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LanguageProgressProps {
  language: string
}

export function LanguageProgress({ language }: LanguageProgressProps) {
  // This would typically come from a database or API
  const progressData = {
    vocabulary: 65,
    grammar: 48,
    speaking: 72,
    listening: 60,
    reading: 80,
    writing: 55,
  }

  const vocabularyWords = [
    { word: "Casa", translation: "House", mastered: true },
    { word: "Perro", translation: "Dog", mastered: true },
    { word: "Gato", translation: "Cat", mastered: true },
    { word: "Libro", translation: "Book", mastered: false },
    { word: "Escuela", translation: "School", mastered: false },
  ]

  const grammarRules = [
    { rule: "Present Tense", description: "Used to describe current actions", mastered: true },
    { rule: "Past Tense", description: "Used to describe completed actions", mastered: false },
    { rule: "Future Tense", description: "Used to describe future actions", mastered: false },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your {language} Progress</CardTitle>
          <CardDescription>Track your language learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Vocabulary</span>
                <span className="text-sm text-muted-foreground">{progressData.vocabulary}%</span>
              </div>
              <Progress value={progressData.vocabulary} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Grammar</span>
                <span className="text-sm text-muted-foreground">{progressData.grammar}%</span>
              </div>
              <Progress value={progressData.grammar} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Speaking</span>
                <span className="text-sm text-muted-foreground">{progressData.speaking}%</span>
              </div>
              <Progress value={progressData.speaking} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Listening</span>
                <span className="text-sm text-muted-foreground">{progressData.listening}%</span>
              </div>
              <Progress value={progressData.listening} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Reading</span>
                <span className="text-sm text-muted-foreground">{progressData.reading}%</span>
              </div>
              <Progress value={progressData.reading} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Writing</span>
                <span className="text-sm text-muted-foreground">{progressData.writing}%</span>
              </div>
              <Progress value={progressData.writing} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vocabulary">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
        </TabsList>
        <TabsContent value="vocabulary">
          <Card>
            <CardHeader>
              <CardTitle>Vocabulary Progress</CardTitle>
              <CardDescription>Words and phrases you've learned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {vocabularyWords.map((item, index) => (
                  <div key={index} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.word}</p>
                      <p className="text-sm text-muted-foreground">{item.translation}</p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${item.mastered ? "bg-green-500" : "bg-amber-500"}`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grammar">
          <Card>
            <CardHeader>
              <CardTitle>Grammar Progress</CardTitle>
              <CardDescription>Grammar rules you've learned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {grammarRules.map((item, index) => (
                  <div key={index} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.rule}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${item.mastered ? "bg-green-500" : "bg-amber-500"}`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

