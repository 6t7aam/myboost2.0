import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle, Star, Zap, Shield, Clock, Target } from "lucide-react";

const ArenaBreakoutInfiniteCoachingPage = () => {
  return (
    <>
      <SEO
        title="ABI – Arena Breakout: Infinite Coaching - Learn From Pro Players"
        description="Arena Breakout: Infinite coaching by elite players. Learn maps, rotations, PvP tactics, loot routes. Personalized 1-on-1 sessions from $8.50/hour. Improve fast with expert ABI coaching."
        keywords="arena breakout infinite coaching, abi coaching, arena breakout infinite training, learn arena breakout infinite, abi lessons"
        canonicalUrl="https://www.myboost.top/arena-breakout-infinite-coaching"
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Elite Training</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout: Infinite <span className="text-primary glow-text">Coaching</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Master Arena Breakout: Infinite with personalized coaching from elite players. Learn map knowledge, rotation strategies, PvP tactics, loot optimization, and economy management through 1-on-1 sessions tailored to your skill level. Our coaches have thousands of hours in-game and proven track records of turning casual players into top-tier operators.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/coaching">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <GraduationCap className="h-5 w-5" /> Book Coaching Now
                  </Button>
                </Link>
                <Link to="/arena-breakout-infinite-boosting">
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-black uppercase text-foreground">
              What You'll <span className="text-primary">Learn</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Target, title: "Map Knowledge", desc: "Callouts, landmarks, loot spawns" },
                { icon: Zap, title: "PvP Combat", desc: "Positioning, aim, engagement tactics" },
                { icon: CheckCircle, title: "Loot Routes", desc: "High-value paths and timing" },
                { icon: Shield, title: "Survival Skills", desc: "Risk management and extraction" },
                { icon: Clock, title: "Economy Management", desc: "Koens optimization and gear value" },
                { icon: Star, title: "Advanced Tactics", desc: "Rotations, sound cues, meta strategies" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border/50 bg-card p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="mt-3 text-lg font-bold text-foreground">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-black uppercase text-foreground">
                  Professional Arena Breakout: Infinite Coaching Service
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout: Infinite has a steep learning curve. Between complex map layouts, punishing PvP combat, and intricate economy management, new players often feel overwhelmed. Even experienced players hit skill plateaus that seem impossible to break through. Our professional coaching service accelerates your improvement by pairing you with elite ABI players who teach you the knowledge and strategies that separate good players from great ones.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Learn From Elite Arena Breakout: Infinite Players
                </h2>
                <p className="text-muted-foreground">
                  Our coaches aren't just good at the game—they're exceptional. Every Arena Breakout: Infinite coach on our team has thousands of hours of experience, proven track records in high-level play, and the ability to teach effectively. They understand the game at a deep level, from the mechanics of sound propagation and bullet ballistics to the psychology of PvP engagements and the meta-game of economy management. When you book coaching with MyBoost, you're learning from players who have mastered every aspect of ABI.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Personalized Training Tailored to Your Goals
                </h2>
                <p className="text-muted-foreground">
                  Every player is different, and our Arena Breakout: Infinite coaching reflects that. During your first session, your coach will assess your current skill level, identify your strengths and weaknesses, and create a customized training plan focused on your specific goals. Struggling with PvP combat? We'll work on positioning, aim, and engagement tactics. Need help with map knowledge? We'll teach you callouts, loot spawns, and optimal rotation paths. Want to improve your survival rate? We'll focus on risk management and extraction strategies.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Master Every Map in Arena Breakout: Infinite
                </h2>
                <p className="text-muted-foreground">
                  Map knowledge is the foundation of success in ABI. Our coaching covers all maps in detail: TV Station's vertical gameplay and tight corridors, Armory's high-value loot rooms and dangerous chokepoints, Valley's open sightlines and sniper positions, Farm's complex building layouts, Airport's massive scale and multiple extraction points, and Northridge's challenging terrain. You'll learn callouts for every location, spawn points for high-value loot, safe rotation paths, and optimal extraction timing for each map.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Advanced PvP Combat Training
                </h2>
                <p className="text-muted-foreground">
                  PvP combat in Arena Breakout: Infinite is unforgiving. Our coaches teach you the advanced tactics that win gunfights: pre-aiming common angles, using sound cues to track enemy movement, positioning for advantageous engagements, knowing when to push versus when to retreat, and managing your gear to maximize survivability. You'll learn how to read situations, make split-second decisions, and come out on top in encounters that would have killed you before.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Economy Management and Loot Optimization
                </h2>
                <p className="text-muted-foreground">
                  Knowing how to manage your Koens and gear is crucial for long-term success. Our Arena Breakout: Infinite coaching includes economy management training: which items to prioritize in raids, how to value gear versus Koens, when to run budget loadouts versus full kits, and how to build your stash efficiently. You'll learn the optimal loot routes that maximize Koens per hour, which items have the best value-to-weight ratios, and how to avoid common economic mistakes that drain your resources.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Real-Time Feedback and VOD Reviews
                </h2>
                <p className="text-muted-foreground">
                  Learning happens fastest with immediate feedback. During live coaching sessions, your coach will watch you play in real-time, providing instant guidance on your decisions, positioning, and tactics. We also offer VOD (video on demand) reviews where you can submit recordings of your raids for detailed analysis. Your coach will break down what you did well, identify mistakes, and explain exactly what you should have done differently. This combination of live coaching and VOD review accelerates your improvement dramatically.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Flexible Scheduling and Affordable Pricing
                </h2>
                <p className="text-muted-foreground">
                  Our Arena Breakout: Infinite coaching is available in flexible packages from 1 to 10 hours at just $8.50 per hour. Sessions are scheduled at your convenience, and you can book as many or as few hours as you need. Whether you want a single session to address a specific issue or a comprehensive 10-hour training program to transform your gameplay, we offer the flexibility to match your needs and budget.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Complete Arena Breakout: Infinite Services
                </h2>
                <p className="text-muted-foreground">
                  While coaching helps you improve your own skills, sometimes you need immediate results. Check out our <Link to="/buy-arena-breakout-infinite-koens" className="text-primary hover:underline">Koens farming service</Link> for fast currency delivery, or our <Link to="/arena-breakout-infinite-raids-boost" className="text-primary hover:underline">raid carry service</Link> for expert assistance on difficult raids. For a complete overview of everything we offer, visit our <Link to="/arena-breakout-infinite-boosting" className="text-primary hover:underline">Arena Breakout: Infinite boosting</Link> page.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Start Your Journey to Mastery Today
                </h2>
                <p className="text-muted-foreground">
                  Why spend months learning through trial and error when you can accelerate your progress with professional coaching? Our students consistently report dramatic improvements in survival rate, Koens earned per raid, PvP win rate, and overall confidence. At just $8.50 per hour, Arena Breakout: Infinite coaching is an investment that pays for itself in better gameplay and more enjoyment. Book your first session today and start your journey to becoming an elite ABI operator.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Who Benefits Most From ABI Coaching?
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout: Infinite coaching serves players at every skill level. Complete beginners learn the fundamentals—basic controls, map layouts, and survival mechanics—to avoid the frustrating early-game learning curve. Intermediate players who've hit a skill plateau receive targeted training to break through to the next level. Experienced players preparing for competitive play refine advanced tactics and learn meta strategies. Players transitioning from other extraction shooters like Escape from Tarkov adapt their existing skills to ABI's unique mechanics. Content creators improve their gameplay to provide better entertainment value for their audience. Casual players who want to maximize their limited gaming time learn efficient strategies to progress faster. Whatever your current skill level or goals, our coaching adapts to your specific needs.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Key Benefits of Professional Coaching
                </h2>
                <p className="text-muted-foreground">
                  Professional Arena Breakout: Infinite coaching accelerates your improvement exponentially compared to solo learning. You avoid developing bad habits that are difficult to break later. Our coaches identify your specific weaknesses and provide targeted solutions instead of generic advice. You learn advanced strategies and tactics that most players never discover on their own. Real-time feedback during live sessions allows immediate correction of mistakes. You gain confidence in your decision-making through understanding the "why" behind every action. The time you save by learning efficiently is worth far more than the coaching cost—instead of spending 100 hours figuring out optimal loot routes through trial and error, you learn them in a single session. Most importantly, you enjoy the game more when you understand what you're doing and see consistent improvement.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  What Makes Our Coaches Elite?
                </h2>
                <p className="text-muted-foreground">
                  Our Arena Breakout: Infinite coaches meet strict qualification standards. Every coach has thousands of verified hours in-game with proven high-level performance. They demonstrate deep understanding of game mechanics, map knowledge, and meta strategies. Most importantly, they possess strong teaching skills—being good at the game isn't enough; they must effectively communicate concepts and adapt their teaching style to different learning preferences. Our coaches undergo training in educational techniques to maximize student improvement. They stay current with game updates, meta shifts, and emerging strategies. Many have competitive experience or content creation backgrounds that provide additional perspective. When you book coaching with MyBoost, you're learning from the best players who are also the best teachers.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Coaching Session Structure and Format
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout: Infinite coaching sessions are structured for maximum learning efficiency. Your first session begins with a skill assessment where your coach evaluates your current abilities and identifies areas for improvement. Together, you'll establish clear goals and create a customized training plan. Live coaching sessions involve you playing while your coach watches and provides real-time guidance on positioning, decision-making, and tactics. VOD review sessions analyze recordings of your raids, breaking down what you did well and what needs improvement. Theory sessions cover map knowledge, game mechanics, and strategic concepts. Practice drills focus on specific skills like aim training, positioning, or loot route memorization. Each session ends with a summary of key takeaways and homework assignments to practice between sessions. This structured approach ensures consistent progress toward your goals.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Measuring Your Improvement
                </h2>
                <p className="text-muted-foreground">
                  We track your progress throughout your Arena Breakout: Infinite coaching journey. Key metrics include survival rate (percentage of raids where you successfully extract), Koens per hour (economic efficiency), PvP kill/death ratio, average raid duration, and quest completion rate. Your coach maintains detailed notes on your strengths, weaknesses, and areas of improvement. Many students report dramatic improvements within just a few sessions—survival rates increasing from 20% to 50%+, Koens per hour doubling or tripling, and PvP confidence transforming from avoidance to active engagement. These measurable improvements validate the effectiveness of professional coaching and demonstrate the return on your investment.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is Arena Breakout: Infinite coaching safe?</h3>
                    <p className="text-muted-foreground">
                      Yes, coaching is completely safe because you play on your own account while our coach guides you through voice communication. There's no account sharing or credential exchange required. You maintain full control of your account at all times while learning from elite players. This makes coaching the safest boosting option available.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How fast will I see improvement?</h3>
                    <p className="text-muted-foreground">
                      Most students see noticeable improvement within their first 1-2 coaching sessions. You'll learn actionable strategies that you can implement immediately. Significant improvements in survival rate, Koens per hour, and PvP performance typically occur within 3-5 hours of coaching. The speed of improvement depends on your dedication to practicing what you learn between sessions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is my account safe during coaching sessions?</h3>
                    <p className="text-muted-foreground">
                      Your account is completely safe because coaching doesn't require account sharing. You play on your own account while our coach watches and provides real-time guidance through voice chat. There's zero risk to your account security. You're simply learning from an expert player—no different from playing with a skilled friend.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">What is your refund policy for coaching?</h3>
                    <p className="text-muted-foreground">
                      We offer full refunds for coaching sessions that haven't been scheduled yet. If you're unsatisfied with your first coaching session, contact our support team within 24 hours and we'll either provide a different coach or issue a refund. We're committed to ensuring you receive high-quality coaching that meets your expectations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How do I get started with coaching?</h3>
                    <p className="text-muted-foreground">
                      Getting started is simple. Select the number of coaching hours you want (1-10 hours), add to cart, and complete checkout using cryptocurrency (LTC, SOL, or USDT). Our team will contact you within minutes to schedule your first session at a time that works for you. You'll be matched with a coach who specializes in your areas of interest and learning goals.
                    </p>
                  </div>
                </div>
              </article>

              {/* CTA Section */}
              <div className="mt-12 rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready to Master Arena Breakout: Infinite?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Book personalized coaching from elite players. $8.50/hour, flexible scheduling, proven results.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/coaching">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Book Coaching Now
                    </Button>
                  </Link>
                  <Link to="/buy-arena-breakout-infinite-koens">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Buy Koens
                    </Button>
                  </Link>
                  <Link to="/arena-breakout-infinite-raids-boost">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Get Raid Carry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ArenaBreakoutInfiniteCoachingPage;
