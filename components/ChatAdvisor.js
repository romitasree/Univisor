import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { askAdvisor, getDemoResponse, USE_DEMO_MODE } from "../api/gemini";

const SUGGESTIONS = [
  "What courses should I take next semester?",
  "When will I graduate?",
  "What requirements do I have left?",
  "How would adding a minor affect my timeline?",
];

export default function ChatAdvisor({ student, onNavigate }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    text: `Hi ${student.name}! 👋 I'm your AI advisor. I know you're studying ${student.major} at UTD with ${student.creditsCompleted} credits completed. Ask me anything!`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  async function send(text) {
    const q = text || input.trim();
    if (!q) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const reply = USE_DEMO_MODE ? getDemoResponse(q, student) : await askAdvisor(q, student);
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Error — please try again." }]);
    } finally { setLoading(false); }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <View style={{ backgroundColor: "#1A237E", padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={() => onNavigate("dashboard")}
          style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8, padding: 6, paddingHorizontal: 12 }}>
          <Text style={{ color: "white" }}>← Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>🤖 AI Advisor</Text>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Powered by Gemini • UTD Data</Text>
        </View>
      </View>

      {messages.length === 1 && (
        <View style={{ padding: 12, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#E8EAF6" }}>
          <Text style={{ fontSize: 12, color: "#90A4AE", fontWeight: "600", marginBottom: 8 }}>SUGGESTED</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {SUGGESTIONS.map(q => (
              <TouchableOpacity key={q} onPress={() => send(q)}
                style={{ padding: 6, paddingHorizontal: 12, backgroundColor: "#E8EAF6", borderRadius: 20 }}>
                <Text style={{ fontSize: 12, color: "#3949AB", fontWeight: "600" }}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}>
        
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 20 }}>
          {messages.map((msg, i) => (
            <View key={i} style={{ flexDirection: "row",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 12 }}>
              {msg.role === "assistant" && (
                <View style={{ width: 32, height: 32, backgroundColor: "#1A237E",
                  borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 8 }}>
                  <Text style={{ fontSize: 16 }}>🤖</Text>
                </View>
              )}
              <View style={{ maxWidth: "78%", padding: 12, borderRadius: 16,
                backgroundColor: msg.role === "user" ? "#1A237E" : "white" }}>
                <Text style={{ color: msg.role === "user" ? "white" : "#37474F", fontSize: 14, lineHeight: 20 }}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ width: 32, height: 32, backgroundColor: "#1A237E",
                borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Text>🤖</Text>
              </View>
              <View style={{ backgroundColor: "white", padding: 12, borderRadius: 16 }}>
                <Text style={{ color: "#90A4AE" }}>...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={{ padding: 12, backgroundColor: "white", borderTopWidth: 1,
          borderTopColor: "#E8EAF6", flexDirection: "row", gap: 10, paddingBottom: 100 }}>
          <TextInput style={{ flex: 1, padding: 10, borderRadius: 12,
            borderWidth: 1.5, borderColor: "#E0E0E0", fontSize: 14 }}
            placeholder="Ask your advisor anything..."
            value={input} onChangeText={setInput}
            onSubmitEditing={() => send()}
            returnKeyType="send"
            blurOnSubmit={false}
            multiline={false} />
        <TouchableOpacity onPress={() => send()} disabled={loading || !input.trim()}
          style={{ width: 44, height: 44, backgroundColor: (loading || !input.trim()) ? "#90A4AE" : "#1A237E",
            borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 18 }}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
