
import React, { useState, useEffect } from 'react';
import { Play, Maximize, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const videos: Video[] = [
    {
      id: 1,
      title: "Processus créatif",
      description: "Découvrez notre approche unique du design et comment nous transformons vos idées en réalités visuelles captivantes.",
      thumbnail: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "2:45"
    },
    {
      id: 2,
      title: "Transformation de marque",
      description: "Étude de cas: comment nous avons revitalisé l'identité visuelle d'une entreprise traditionnelle pour la rendre contemporaine.",
      thumbnail: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "4:12"
    },
    {
      id: 3,
      title: "Design et expérience utilisateur",
      description: "L'importance de l'UX dans le design d'interface et comment nous créons des expériences mémorables.",
      thumbnail: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "3:30"
    }
  ];

  return (
    <section id="videos" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Vidéos & Showreel</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-gold-100/80">
            Découvrez notre travail en mouvement à travers des vidéos qui illustrent notre processus créatif et nos réalisations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="animate-on-scroll opacity-0 glass-panel rounded-xl overflow-hidden group hover:shadow-[0_0_15px_5px_rgba(228,126,1,0.15)] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <Play className="text-black ml-1" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-gold-300">
                    {video.duration}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold-300 mb-2">{video.title}</h3>
                <p className="text-gold-100/70 text-sm mb-4">{video.description}</p>
                <button 
                  className="text-gold-400 hover:text-gold-300 text-sm flex items-center gap-2 transition-colors"
                  onClick={() => setSelectedVideo(video)}
                >
                  <span>Regarder la vidéo</span>
                  <Play size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-4xl glass-panel rounded-xl p-2 relative">
              <button 
                className="absolute top-4 right-4 text-gold-300 hover:text-gold-500 z-20 transition-colors bg-black/50 rounded-full p-1"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={24} />
              </button>
              
              <div className="relative aspect-video">
                <iframe 
                  src={selectedVideo.videoUrl} 
                  title={selectedVideo.title} 
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gold-300">{selectedVideo.title}</h3>
                <p className="text-gold-100/80 text-sm mt-2">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideosSection;
