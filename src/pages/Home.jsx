import heroImg from '../assets/heroImg.webp';

function HomePage() {
  return (
    <>
      <div>
        <h1>Transforme sua rotina em uma história de conquistas!</h1>
        <p>Com o TaskStory, cada tarefa concluída é um passo rumo ao seu sucesso. Supere a procrastinação, organize seu dia e evolua de forma divertida com mecânicas de gamificação.</p>
      </div>
      <img src={heroImg}/>
    </>
  )
};

export default HomePage;