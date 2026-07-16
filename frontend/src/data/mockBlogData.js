export const MOCK_POST = {
  id: "beyond-silicon",
  title: "Beyond Silicon: The Emergence of Neuromorphic Edge Computing",
  subtitle:
    "Mimicking the human brain's neural architecture, neuromorphic chips promise orders-of-magnitude energy efficiency improvements for next-gen AI.",
  category: "Technology",
  categoryColor: "text-violet-600",
  categoryBg: "bg-violet-50 text-violet-700 border-violet-200",
  readTime: "10 min read",
  date: "May 10, 2024",
  author: "Dr. Arjun Mehta",
  authorRole: "Senior Research Fellow, Neural Computing Lab",
  authorBio:
    "Dr. Arjun Mehta is a senior research fellow specialising in neuromorphic hardware and low-power AI architectures. His work bridges the gap between academic benchmarks and real-world edge deployment. He has published over 40 peer-reviewed papers and advises multiple hardware start-ups.",
  authorAvatar: null,
  image: "/images/neuromorphic_computing.png",
  tags: ["Neuromorphic", "Edge AI", "Semiconductors", "Future Tech"],
  body: [
    {
      type: "paragraph",
      text: "In the hallowed corridors of computational research, a silent revolution is gathering momentum. Unlike the brute-force scaling that has defined the silicon era — cramming ever more transistors onto a die — neuromorphic computing takes its cues from a far older and more energy-efficient processor: the human brain.",
    },
    {
      type: "paragraph",
      text: "Traditional von Neumann architectures enforce a strict separation between memory and processing. Every operation requires data to travel back and forth across a shared bus — a bottleneck that becomes increasingly costly as models grow. Neuromorphic chips sidestep this entirely by co-locating memory and computation in analog synaptic elements, enabling in-memory computing at a fraction of the energy cost.",
    },
    {
      type: "heading",
      text: "Spikes, Not Streams",
    },
    {
      type: "paragraph",
      text: "The key innovation lies in event-driven computation. Where a GPU processes data in dense, regular tensor operations, a spiking neural network (SNN) fires only when a neuron accumulates sufficient activation — exactly as biological neurons do. The result is sparse, asynchronous computation that scales elegantly to edge deployments where every milliwatt matters.",
    },
    {
      type: "quote",
      text: '"The true measure of an intelligent system is not its ability to simulate human speech, but its capacity to operate within the bounds of human morality — and the energy envelope of a hummingbird."',
      attribution: "— Prof. Carla Morrow, MIT CSAIL Symposium 2024",
    },
    {
      type: "paragraph",
      text: "Pioneering efforts from Intel's Loihi project, IBM's NorthPole, and a raft of university spin-offs have begun to coalesce around a shared vision: a world where inference happens directly at the data source — on a smartwatch, inside an agricultural sensor, embedded in the retina of an autonomous drone — without a round-trip to the cloud.",
    },
    {
      type: "heading",
      text: "The Ethics of Visibility",
    },
    {
      type: "paragraph",
      text: "When we discuss algorithmic transparency, we often get bogged down in the technicalities of PyTorch models or Transformer architectures. But the real question is simpler, and more uncomfortable: who decides what information a low-power, always-on sensor should share? Neuromorphic chips, precisely because of their efficiency, make pervasive sensing economically viable in ways that were simply not possible before.",
    },
    {
      type: "paragraph",
      text: 'This demands a new class of governance. The end of "move fast and break things" is being replaced by "think ahead and prove it." Regulatory bodies across the EU and emerging frameworks in the US are beginning to treat embedded inference as a first-class policy concern — not an afterthought bolted onto a product launch.',
    },
  ],
};

export const RELATED_POSTS = [
  {
    id: "beyond-silicon-2",
    title: "Designing for the Post-Attention, Hyper-Logged World",
    category: "Technology",
    categoryColor: "text-violet-600",
    readTime: "7 min read",
    image: "/images/neuromorphic_computing.png",
  },
  {
    id: "green-pivot",
    title: "The Transparency Premium: Why Brands are Opening Up",
    category: "Business",
    categoryColor: "text-blue-600",
    readTime: "5 min read",
    image: "/images/green_pivot.png",
  },
  {
    id: "slow-craft",
    title: "The Quiet Revolution of Slow Craft in the High-Speed Digital Era",
    category: "Lifestyle",
    categoryColor: "text-indigo-600",
    readTime: "5 min read",
    image: "/images/slow_craft.png",
  },
];
