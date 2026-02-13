export const TASK_MEANINGS = [
    {
        keywords: ['breath', 'inhale', 'exhale'],
        text: "Deep breathing activates your vagus nerve, signaling your body to calm down instantly.",
    },
    {
        keywords: ['water', 'hydration', 'drink'],
        text: "Even mild dehydration can cause fatigue and effectively lower your mood.",
    },
    {
        keywords: ['stretch', 'roll', 'neck', 'shoulders'],
        text: "Physical tension stores emotional stress. Releasing muscles signals safety to your brain.",
    },
    {
        keywords: ['draw', 'doodle', 'trace', 'sketch'],
        text: "Creative expression, however small, shifts your brain from 'survival mode' to 'creation mode'.",
    },
    {
        keywords: ['write', 'list', 'journal'],
        text: "Getting thoughts out of your head and onto a page reduces cognitive load.",
    },
    {
        keywords: ['look', 'see', 'notice', 'observe'],
        text: "Grounding yourself visually pulls you out of a racing mind and into the present reality.",
    },
    {
        keywords: ['count', 'name', 'list'],
        text: "Structured thinking tasks can gently interrupt a panic or anxiety loop.",
    },
    {
        keywords: ['smile', 'laugh'],
        text: "The physical act of smiling releases endorphins, even if you don't feel like it at first.",
    },
    {
        keywords: ['hand', 'squeeze', 'fist', 'touch'],
        text: "Tactile sensations are powerful grounding tools to reconnect with your body.",
    },
    {
        keywords: ['listen', 'sound', 'hear'],
        text: "focusing on external sounds shifts attention away from internal chatter.",
    },
]

export function getMeaningForTask(task) {
    if (!task) return null
    const lower = task.toLowerCase()
    const match = TASK_MEANINGS.find((m) =>
        m.keywords.some((k) => lower.includes(k))
    )
    return match ? match.text : "Small steps create big shifts."
}
