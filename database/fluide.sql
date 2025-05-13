-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 13 mai 2025 à 09:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fluide_et_libre`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `article_body` longtext NOT NULL,
  `pseudo` varchar(64) NOT NULL,
  `is_enabled` tinyint(1) NOT NULL,
  `categorie` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`article_id`, `title`, `article_body`, `pseudo`, `is_enabled`, `categorie`) VALUES
(1, 'Le conflit approche-évitement et le bégaiement : comprendre le dilemme interne', '<p>Dans son livre Beyond Stuttering, Dave McGuire explique comment le bégaiement peut être compris à travers le concept psychologique du conflit approche-évitement. Ce concept, développé par Kurt Lewin, décrit une situation où une personne est simultanément attirée et repoussée par un objectif.\r\n\r\nDans le cas du bégaiement, une personne qui veut s\'exprimer ressent un fort désir de parler (approche) mais, en même temps, une peur intense du bégaiement et du jugement des autres (évitement). Ce conflit crée une tension interne qui, à mesure que l\'on s\'approche de la prise de parole, peut provoquer un blocage.\r\n</p><br>\r\n<h4>Un mécanisme comparable à la peur de la performance</h4>\r\n<p>McGuire illustre ce phénomène en comparant le bégaiement à d\'autres situations impliquant une peur de la performance. Par exemple, un acteur peut ressentir une excitation à jouer sur scène (approche) mais aussi la peur de l\'échec ou du ridicule (évitement). Si la peur devient trop intense, elle peut complètement bloquer l\'action.\r\n\r\nCe qui distingue le bégaiement, cependant, est que ce conflit devient un schéma automatique et inconscient qui se renforce avec le temps. Plus une personne anticipe le bégaiement, plus le conflit approche-évitement s\'intensifie, créant un cercle vicieux.\r\n</p><br>\r\n<h4>Une solution : changer la perception du bégaiement</h4>\r\n<p>Pour McGuire, la clé pour réduire ce conflit est de modifier la manière dont la personne perçoit le bégaiement. Si parler devient une activité dénuée de peur et si l\'on adopte une approche proactive plutôt que réactive, alors l\'évitement diminue et l\'expression devient plus fluide. Cela peut passer par des exercices de contrôle de la parole, des techniques de gestion du stress ou encore un changement de perspective sur l\'importance de la parole fluide.\r\n<br>\r\nEn comprenant le conflit approche-évitement et en travaillant à réduire la peur associée à la parole, les personnes qui bégaient peuvent progressivement débloquer leur expression et retrouver une communication plus sereine.\r\n<p>', 'Chancla12', 1, 'Science'),
(2, 'Le diaphragme et son rôle dans le bégaiement', '<p>Le diaphragme joue un rôle crucial dans la respiration et, par extension, dans la parole. Dave McGuire, dans <i>Beyond Stuttering</i>, explique comment ce muscle semi-automatique est directement impliqué dans le bégaiement. Comprendre son fonctionnement peut aider à mieux contrôler la parole et à réduire les blocages.</p>\r\n\r\n<h4>Le diaphragme : un muscle central</h4>\r\n\r\n<p>Le diaphragme est un muscle en forme de cloche situé dans le thorax. Il fonctionne de manière semi-automatique : une partie de son activité est inconsciente (comme respirer en dormant), mais il peut aussi être contrôlé volontairement, par exemple pour parler ou chanter. Lorsque nous inspirons, le diaphragme se contracte et crée un vide qui attire l\'air dans les poumons. Lors de l\'expiration, il se relâche et l\'air est expulsé.</p>\r\n\r\n<h4>Diaphragme et émotions : une connexion puissante</h4>\r\n\r\n<p>Les Grecs anciens appelaient le diaphragme \"le foyer de l\'âme\", car il est fortement lié aux émotions. La peur, en particulier, provoque une contraction involontaire du diaphragme, ce qui perturbe la respiration. Or, pour parler, le diaphragme doit se détendre. Chez les personnes qui bégaient, ce conflit entraîne souvent un blocage de l\'air ou un flux d\'air chaotique, ce qui complique la production fluide des mots.</p>\r\n\r\n<h4>Deux structures du diaphragme : crural et costal</h4>\r\n\r\n<p>Le diaphragme est composé de deux parties distinctes :</p>\r\n<br>\r\n<ul>\r\n    <li><strong>Le diaphragme crural</strong> : attaché à la colonne vertébrale, il gère la respiration normale et fonctionne automatiquement.</li>\r\n    <li><strong>Le diaphragme costal</strong> : connecté aux côtes, il est activé lors d\'efforts physiques intenses, du chant ou des cris. Il est sous contrôle volontaire.</li>\r\n</ul>\r\n<br>\r\n<p>Des études ont montré que le diaphragme crural a tendance à se contracter sous l\'effet de la peur, perturbant ainsi la parole. Une solution pour les personnes qui bégaient est d\'apprendre à utiliser le diaphragme costal pour respirer et parler. Cette technique permet non seulement de dépasser les blocages, mais aussi de développer une voix plus puissante et plus expressive.</p>\r\n\r\n<h4>Parler en mobilisant le diaphragme costal</h4>\r\n\r\n<p>Selon McGuire, de nombreux anciens bégayeurs ont amélioré leur fluidité en adoptant une respiration basée sur le diaphragme costal. En mobilisant cette partie du muscle, ils désactivent la réaction de peur qui contracte le diaphragme crural. Cette approche leur permet de parler avec assurance et naturel, en évitant les tensions qui mènent aux blocages.</p>\r\n\r\n<h4>Une approche prometteuse pour la fluidité</h4>\r\n\r\n<p>Apprendre à respirer avec le diaphragme costal constitue une stratégie efficace pour réduire le bégaiement. En contrôlant consciemment leur respiration et en développant une voix plus ancrée, les personnes qui bégaient peuvent reprendre confiance en leur capacité à s\'exprimer librement et avec aisance.</p>\r\n', 'Chancla12', 1, 'Science'),
(3, 'Transformer la peur en croyance : maîtriser les mots redoutés', '\r\n\r\n<p>Certains mots semblent porteurs d’une malédiction pour ceux qui bégaient. Ils apparaissent comme des obstacles insurmontables, déclenchant stress et blocages. Pourtant, ces mots redoutés ne sont que des croyances auto-renforcées. En changeant notre perception, nous pouvons transformer cette peur en une croyance positive.</p>\r\n\r\n<h4>Pourquoi certains mots bloquent-ils la parole ?</h4>\r\n\r\n<p>Le cerveau associe des expériences négatives à certains mots. Par exemple, si une personne a bégayé en disant \"bonjour\" lors d’une situation stressante, elle peut développer une anticipation négative autour de ce mot. Cette anticipation crée une boucle de peur et de tension qui rend le bégaiement plus probable.</p>\r\n\r\n<h4>Remplacer la peur par une croyance positive</h4>\r\n\r\n<p>Dave McGuire propose une approche simple mais efficace : transformer la peur en croyance positive. Plutôt que de voir un mot comme un piège, il s’agit de le percevoir comme une opportunité de démontrer son contrôle. Cela implique :</p>\r\n<br>\r\n<ul>\r\n<li>De s’exercer à prononcer le mot consciemment et avec confiance.</li>\r\n<li>D’utiliser des techniques de respiration et de projection vocale.</li>\r\n<li>De se répéter mentalement que l’on est capable de le dire sans crainte.</li>\r\n</ul>\r\n<br>\r\n<h4>L\'importance de la pratique et de l’exposition</h4>\r\n\r\n<p>La clé du succès réside dans la répétition et l\'exposition progressive. Plus on s’entraîne à dire les mots redoutés dans un cadre rassurant, plus ils perdent leur charge émotionnelle. Cela permet de reprendre le contrôle et d’éliminer la peur associée.</p>\r\n\r\n<h4>Une transformation accessible à tous</h4>\r\n\r\n<p>En modifiant notre perception et en remplaçant nos croyances limitantes par des croyances aidantes, nous pouvons dépasser la peur des mots redoutés. Chaque mot maîtrisé devient une victoire qui renforce la confiance et la fluidité dans la parole.</p>\r\n', 'Chancla124', 1, 'Développement personnel');

-- --------------------------------------------------------

--
-- Structure de la table `preview_article`
--

CREATE TABLE `preview_article` (
  `article_id` int(11) NOT NULL,
  `is_enabled` tinyint(4) NOT NULL,
  `title` varchar(255) NOT NULL,
  `img` varchar(64) NOT NULL,
  `preview_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `preview_article`
--

INSERT INTO `preview_article` (`article_id`, `is_enabled`, `title`, `img`, `preview_text`) VALUES
(1, 1, 'Le conflit approche-évitement et le bégaiement : comprendre le dilemme interne', '<img src=\"/tests/stutter/img/approach-avoidance-img.jpg\">', '<p>Le bégaiement n\'est pas qu\'un trouble de la parole, c\'est aussi une lutte physique et mentale. Cet article explore la méthode McGuire, qui transforme les blocages en un nouveau mode d’expression basé sur la maîtrise du souffle et la confiance en soi.</p>\r\n'),
(2, 1, 'Le diaphragme et son rôle dans le bégaiement', '<img src=\"/tests/stutter/img/diaphragme-img.jpg\">', '<p>Le diaphragme joue un rôle clé dans la parole fluide. Chez les personnes qui bégaient, une mauvaise coordination diaphragmatique entraîne des blocages. Beyond Stuttering explique comment réapprendre à respirer et à contrôler le diaphragme permet d\'améliorer la fluidité.</p>'),
(3, 1, 'Transformer la peur en assurance : maîtriser les mots redoutés', '<img src=\"/tests/stutter/img/article-assurance-peur.jpg\">', '<p>Surmonter le bégaiement, c\'est transformer ses perceptions en croyances solides grâce à la répétition et la persévérance. Ce chapitre explore des techniques puissantes pour affronter les mots redoutés, briser le cycle de la panique et renforcer sa confiance. En adoptant des stratégies comme la dysfluence délibérée, la focalisation auditive et le soutien, il devient possible de dominer la peur et de parler avec assurance.</p>');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `pseudo` varchar(64) NOT NULL,
  `full_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`article_id`);

--
-- Index pour la table `preview_article`
--
ALTER TABLE `preview_article`
  ADD PRIMARY KEY (`article_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `preview_article`
--
ALTER TABLE `preview_article`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
