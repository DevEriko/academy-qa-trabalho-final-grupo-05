Feature: Avaliação de filmes
    Como um usuário da aplicação
    Desejo poder escrever avaliações sobre os filmes
    Para ser capas de compartilhar minha opinião sobre os filmes
    
    # @ignore
    Scenario: Deve ser possível criar uma avaliação e atribuir uma nota para um filme
        Given que estou logado e na tela de um filme específico
        When criar uma nova avaliação
        And concluir operação
        Then será possível visualizar a avaliação criada
    
    # @ignore
    Scenario: Não deve ser possível consultar avaliação do usuário sem estar logado
        Given que acesso à tela de filmes
        When buscar e selecionar um filme específico
        Then será possível visualizar a opção "Entre para poder escrever sua review"
        And o sistema encaminhará para a tela de login
    
    # @ignore
    Scenario: Não deve ser possível criar uma avaliação sem atribuir nota
        Given que estou logado e na tela de um filme específico
        When inserir um texto de avaliação
        And concluir operação
        Then não será possível criar uma avaliação

    # @ignore
    Scenario: Deve ser possível atribuir uma nota sem criar texto avaliativo
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And concluir operação
        Then a nota é exibida e avaliação fica em branco
    
    # @ignore
    Scenario: Deve ser possivel editar uma avaliação
        Given que fiz a avaliação de um filme
        When reescrever nova avaliação
        And concluir operação
        Then a avaliação antiga será atualizada
    
    # @ignore
    Scenario: Deve ser possível escrever uma avaliação com 500 caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And inserir um texto avaliativo com 500 caracteres
        And concluir operação
        Then será possível visualizar a avaliação criada
    
    # @ignore
    Scenario: Não deve ser possível escrever uma avaliação com mais que 500 caracteres
        Given que estou logado e na tela de um filme específico
        When atribuir uma nota
        And inserir um texto avaliativo com mais de 500 caracteres
        And concluir operação
        Then a avaliação não será enviada